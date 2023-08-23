using melodiy.server.Dtos.Song;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.FileService;
using NAudio.Wave;

namespace melodiy.server.Services.SongService
{
    public class SongService : ISongService
    {
    	private readonly DataContext _context;
    	private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IFileService _fileService;
        
		public SongService(DataContext context, IMapper mapper, IAuthService authService, IFileService fileService)
		{
      		_mapper = mapper;
      		_context = context;
      		_authService = authService;
            _fileService = fileService;
		}

        public async Task<ServiceResponse<GetSongResponse>> UploadSong(UploadSongRequest request)
        {
            var response = new ServiceResponse<GetSongResponse>();

            try
			{   
                var songPath = await _fileService.UploadSong(request.Audio);
                if (!songPath.Success || songPath.Data == null)
                {
                    response.Message = songPath.Message;
                    response.Success = false;
                    response.StatusCode = 400;
                    return response;
                }

                var imagePath = string.Empty;
                if (request.Image != null) 
                {
                    var imageDetails = await _fileService.UploadImage(request.Image);
                    if (imageDetails.Success) imagePath = imageDetails.Data;
                }
                
                // //TODO: Move to param?
				var userId = _authService.GetUserId();
                int duration = (int)await GetMediaDuration(request.Audio);

                var newSong = new Song
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
                    
				_context.Songs.Add(newSong);
				await _context.SaveChangesAsync();

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
            var response = new ServiceResponse<List<GetSongResponse>>();

			try
			{
				var dbPlaylists = await _context.Songs
                                .Include(s => s.User)
								.Where(s => s.UserId == userId).ToListAsync();
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
            var response = new ServiceResponse<GetSongResponse>();

			try
			{
				var dbSong = await _context.Songs
                                .Include(s => s.User)
                                .FirstOrDefaultAsync(s => s.UID == songId);

                if (dbSong == null)
                {
                    response.Success = false;
                    response.StatusCode = 404;
                    response.Message = $"Song, {songId} not found";
                    return response;
                }
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
                var dbSongs = await _context.Songs
                            .Where(s => ids.Contains(s.UID))
                            .ToListAsync();  
                return dbSongs.Select(_mapper.Map<GetSongResponse>).ToList();  
            }
            catch (Exception)
			{
                return new List<GetSongResponse>();
			}
          
        }

        private async Task<double> GetMediaDuration(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0; //Doesn't work without this here dk why
            
            StreamMediaFoundationReader reader = new StreamMediaFoundationReader(memoryStream);
            return reader.TotalTime.TotalMilliseconds;
        }

        public async Task<ServiceResponse<GetSongResponse>> DeleteSong(string songId, int userId)
        {
            var response = new ServiceResponse<GetSongResponse>();

            try
            {
                var song = await _context.Songs
                    .Include(s => s.User)
                    .Include(s => s.PlaylistSongs)
                    .FirstAsync(s => s.UID == songId);

                if (song == null) {
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

                _context.Songs.Remove(song);
                _context.PlaylistSongs.RemoveRange(song.PlaylistSongs);
                await _context.SaveChangesAsync();

                await _fileService.DeleteFile("songs", song.SongPath);
                if (song.CoverPath != null && (song.CoverPath != "images/default_playlist.png"  || song.CoverPath != "default_playlist.png")) 
                    await _fileService.DeleteFile("images", song.CoverPath);
                
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