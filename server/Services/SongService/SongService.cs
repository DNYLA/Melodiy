using ATL;
using melodiy.server.Data.File;
using melodiy.server.Dtos.Song;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.FileService;

namespace melodiy.server.Services.SongService
{
    public class SongService : ISongService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IFileService _fileService;
        private readonly IFileRepository _fileRepo;

        public SongService(DataContext context, IMapper mapper, IAuthService authService, IFileService fileService, IFileRepository fileRepo)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
            _fileService = fileService;
            _fileRepo = fileRepo;
        }

        public async Task<ServiceResponse<GetSongResponse>> UploadSong(UploadSongRequest request)
        {
            ServiceResponse<GetSongResponse> response = new();

            try
            {
                ServiceResponse<string> songPath = await _fileService.UploadSong(request.Audio);
                if (!songPath.Success || songPath.Data == null)
                {
                    response.Message = songPath.Message;
                    response.Success = false;
                    response.StatusCode = songPath.StatusCode;

                    return response;
                }

                string imagePath = string.Empty;
                if (request.Image != null)
                {
                    ServiceResponse<string> imageDetails = await _fileService.UploadImage(request.Image);
                    if (imageDetails.Success)
                    {
                        imagePath = imageDetails.Data!;
                    }
                }

                // //TODO: Move to param?
                int userId = _authService.GetUserId();
                int duration = (int)await GetMediaDuration(request.Audio);

                Song newSong = new()
                {
                    Title = request.Title,
                    Artist = request.Artist,
                    Album = request.Album,
                    AlbumArtist = request.AlbumArtist,
                    SongPath = songPath.Data,
                    CoverPath = imagePath,
                    Duration = duration,
                    UserId = userId
                };

                _ = _context.Songs.Add(newSong);
                _ = await _context.SaveChangesAsync();

                response.Data = _mapper.Map<GetSongResponse>(newSong);
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

        public async Task<ServiceResponse<List<GetSongResponse>>> GetUserSongs(int userId)
        {
            ServiceResponse<List<GetSongResponse>> response = new();

            try
            {
                List<Song> dbPlaylists = await _context.Songs
                                .Include(s => s.User)
                                .Where(s => s.UserId == userId)
                                .OrderBy(s => s.Id)
                                .ToListAsync();
                response.Data = dbPlaylists.Select(_mapper.Map<GetSongResponse>).ToList();
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

        public async Task<ServiceResponse<GetSongResponse>> GetSong(string songId)
        {
            ServiceResponse<GetSongResponse> response = new();

            try
            {
                Song? dbSong = await _context.Songs
                                .Include(s => s.User)
                                .FirstOrDefaultAsync(s => s.UID == songId);

                if (dbSong == null)
                {
                    response.Success = false;
                    response.StatusCode = 404;
                    response.Message = $"Song, {songId} not found";
                    return response;
                }

                string songUrl = await _fileRepo.GetSignedUrl(dbSong.SongPath, FileType.Audio);

                if (songUrl == string.Empty)
                {
                    response.Success = false;
                    response.StatusCode = 404;
                    response.Message = $"Song, {songId} not found";
                    return response;
                }

                dbSong.SongPath = songUrl;
                response.Data = _mapper.Map<GetSongResponse>(dbSong);
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

        public async Task<List<GetSongResponse>> GetSongs(List<string> ids)
        {
            try
            {
                List<Song> dbSongs = await _context.Songs
                            .Where(s => ids.Contains(s.UID))
                            .ToListAsync();
                return dbSongs.Select(_mapper.Map<GetSongResponse>).ToList();
            }
            catch (Exception)
            {
                return new List<GetSongResponse>();
            }

        }

        private static async Task<double> GetMediaDuration(IFormFile file)
        {
            using MemoryStream memoryStream = new();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0; //Doesn't work without this here dk why

            Track track = new(memoryStream);
            return track.DurationMs;
        }

        public async Task<ServiceResponse<GetSongResponse>> DeleteSong(string songId, int userId)
        {
            ServiceResponse<GetSongResponse> response = new();

            try
            {
                Song song = await _context.Songs
                    .Include(s => s.User)
                    .Include(s => s.PlaylistSongs)
                    .FirstAsync(s => s.UID == songId);

                if (song == null)
                {
                    response.Success = false;
                    response.Message = $"Unable to find song with id {songId}";
                    response.StatusCode = 404;
                    return response;
                }

                if (song.User.Id != userId)
                {
                    response.Success = false;
                    response.Message = "Can't delete a song you didn't create.";
                    response.StatusCode = 401;
                    return response;
                }

                _ = _context.Songs.Remove(song);
                _context.PlaylistSongs.RemoveRange(song.PlaylistSongs);
                _ = await _context.SaveChangesAsync();

                _ = await _fileService.DeleteFile("songs", song.SongPath);

                //TODO: Check if image is used in other songs/playlists before deleting.
                // if (song.CoverPath is not null)
                // {
                //     _ = await _fileService.DeleteFile("images", song.CoverPath);
                // }

                response.Data = _mapper.Map<GetSongResponse>(song);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.StatusCode = 500;
                return response;
            }

            return response;
        }
    }
}