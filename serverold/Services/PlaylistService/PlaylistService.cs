using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using melodiy.server.Dtos.Playlist;
using melodiy.server.Dtos.PlaylistSong;
using melodiy.server.Dtos.Song;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.FileService;
using melodiy.server.Services.SongService;
using Newtonsoft.Json;

namespace melodiy.server.Services.PlaylistService
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IAuthService _authService;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly ISongService _songService;
        public PlaylistService(DataContext context, IMapper mapper, IAuthService authService, IFileService fileService, ISongService songService)
        {
            _songService = songService;
            _fileService = fileService;
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }


        public async Task<ServiceResponse<GetPlaylistResponse>> CreatePlaylist(IFormFile? image, string title)
        {
            var response = new ServiceResponse<GetPlaylistResponse>();

            // Services should not inherntly require an AuthService to be present however in this case
            // CreatePlaylist will never be called without an authentiction provided.
            //TODO: Move To Controller
            if (!_authService.IsAuthenticated())
            {
                response.Success = false;
                response.StatusCode = 401;
                response.Message = "Unauthorized Access";
                return response;
            }

            try
            {
                string? path = null;
                if (image != null)
                {
                    var imageDetails = await _fileService.UploadImage(image);
                    path = imageDetails.Success ? imageDetails.Data : null;
                }



                var userId = _authService.GetUserId();
                var playlist = new Playlist
                {
                    Title = title,
                    ImagePath = path,
                    UserId = userId,
                };
                _context.Playlists.Add(playlist);
                await _context.SaveChangesAsync();

                response.Data = _mapper.Map<GetPlaylistResponse>(playlist);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetPlaylistResponse>>> GetAllPlaylists(int userId)
        {
            var response = new ServiceResponse<List<GetPlaylistResponse>>();

            try
            {
                var dbPlaylists = await _context.Playlists
                                .Include(p => p.User)
                                .Where(p => p.UserId == userId).ToListAsync();
                response.Data = dbPlaylists.Select(p => _mapper.Map<GetPlaylistResponse>(p)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetPlaylistResponse>> GetPlaylistByUID(string uid)
        {
            var response = new ServiceResponse<GetPlaylistResponse>();

            try
            {
                var playlist = await _context.Playlists
                                .Include(p => p.User)
                                .Include(p => p.PlaylistSongs)
                                .ThenInclude(ps => ps.Song)
                                .FirstOrDefaultAsync(p => p.UID == uid);

                if (playlist == null)
                {
                    response.Message = "Playlist not found.";
                    response.StatusCode = 404;
                    response.Success = false;
                    return response;
                }

                //var songIds = playlist.PlaylistSongs.Select(ps => ps.SongUID).ToList();
                // var songs = await _songService.GetSongs(songIds);
                var mappedSongs = playlist.PlaylistSongs.Select(ps => _mapper.Map<GetSongResponse>(ps.Song)).ToList();

                mappedSongs = mappedSongs.Select(s =>
                {
                    var foundSong = playlist.PlaylistSongs.Find(ps => ps.SongUID == s.UID);
                    if (foundSong == null) return s;
                    s.CreatedAt = foundSong.CreatedAt;
                    return s;
                }).ToList();

                //Dont think this actually checks if mappedSongs.UID === playlistSong.UID which could cause
                //some unintended sideeffects if we decide to change how mappedSongs are stored.
                // mappedSongs = mappedSongs.Zip(playlist.PlaylistSongs, (song, ps) => 
                // {
                //     Console.WriteLine(ps.CreatedAt);
                //     song.CreatedAt = ps.CreatedAt;
                //     return song;
                // }).ToList();

                response.Data = _mapper.Map<GetPlaylistResponse>(playlist);
                response.Data.Tracks = mappedSongs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetPlaylistSongResponse>> AddSong(int userId, string playlistId, string trackId)
        {
            var response = new ServiceResponse<GetPlaylistSongResponse>();

            try
            {
                var playlist = await _context.Playlists
                        .Include(p => p.User)
                        // .Include(p => p.PlaylistSongs)
                        // .Include(p => p.Song)
                        .FirstOrDefaultAsync(p => p.UID == playlistId && p.User.Id == userId);

                #region Playlist Validation
                //Invalid Data
                //TODO: Possible move to own function?
                if (playlist == null)
                {
                    response.Success = false;
                    response.Message = $"Playlist: {playlistId} not found.";
                    response.StatusCode = 400;
                    return response;
                }

                #endregion

                var song = await _context.Songs.FindAsync(trackId);
                #region Song Validation
                //TODO: Check if song is PUBLIC.
                if (song == null)
                {
                    response.Success = false;
                    response.Message = $"Song {trackId} not found.";
                    response.StatusCode = 400;
                    return response;
                }
                #endregion

                var playlistSong = new PlaylistSong
                {
                    PlaylistUID = playlist.UID,
                    SongUID = song.UID
                };

                Console.WriteLine("Here");
                //Add to playlist
                // playlist.PlaylistSongs.Add(playlistSong);
                //Important to note that we dont add to the playlist directly as that requires us to fetch the playlists PlaylistSongs 
                //which would be a waste of resources as they aren't needed. 
                _context.PlaylistSongs.Add(playlistSong);
                await _context.SaveChangesAsync();
                response.Data = _mapper.Map<GetPlaylistSongResponse>(playlistSong);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetTrendingPlaylistResponse>>> GetTrending()
        {
            var response = new ServiceResponse<List<GetTrendingPlaylistResponse>>();

            try
            {
                var dbPlaylists = await _context.Playlists
                            .Include(p => p.User)
                            .OrderByDescending(p => p.CreatedAt)
                            .Where(p => p.PlaylistSongs.Count > 0)
                            .Take(10).ToListAsync();
                response.Data = dbPlaylists.Select(_mapper.Map<GetTrendingPlaylistResponse>).ToList();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.Success = false;
                response.Message = ex.Message;
                response.StatusCode = 500;
            }

            return response;
        }

        public async Task<ServiceResponse<GetPlaylistSongResponse>> RemoveSong(int userId, string playlistId, string songId)
        {
            var response = new ServiceResponse<GetPlaylistSongResponse>();

            try
            {
                var playlist = await _context.Playlists
                        .Include(p => p.User)
                        .Include(p => p.PlaylistSongs.Where(ps => ps.SongUID == songId))
                        // .Include(p => p.Song)
                        .FirstOrDefaultAsync(p => p.UID == playlistId);


                #region Playlist Validation
                //Invalid Data
                //TODO: Possible move to own function?

                if (playlist == null)
                {
                    response.Success = false;
                    response.Message = $"Playlist: {playlistId} not found.";
                    response.StatusCode = 400;
                    return response;
                }

                if (playlist.UserId != userId)
                {
                    response.Success = false;
                    response.Message = $"You dont own this playlist.";
                    response.StatusCode = 401;
                    return response;
                }

                if (playlist.PlaylistSongs == null || playlist.PlaylistSongs.Count == 0)
                {
                    response.Success = false;
                    response.Message = $"Song not in playlist.";
                    response.StatusCode = 400;
                    return response;
                }
                #endregion


                var song = playlist.PlaylistSongs[0];
                _context.PlaylistSongs.Remove(song);
                await _context.SaveChangesAsync();
                response.Data = _mapper.Map<GetPlaylistSongResponse>(song);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}