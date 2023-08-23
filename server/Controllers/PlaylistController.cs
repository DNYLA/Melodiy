using melodiy.server.Dtos.Playlist;
using melodiy.server.Dtos.PlaylistSong;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.FileService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
	[ApiController]
	[Route("api/[controller]")]
    public class PlaylistController : ControllerBase
    {
		private readonly IPlaylistService _playlistService;
    	private readonly IAuthService _authService;
        private readonly IFileService _fileService;
		public PlaylistController(IPlaylistService playlistService, IAuthService authService, IMapper iMapper, IFileService fileService)
		{
            _fileService = fileService;
      		_authService = authService;
      		_playlistService = playlistService;
		}


		[Authorize]
       	[HttpPost]
		public async Task<ActionResult<ServiceResponse<GetPlaylistResponse>>> Create(IFormFile? image, [FromQuery]string title)
		{
			var response = await _playlistService.CreatePlaylist(image, title);
			
			return response;
		}

		[Authorize]
		[HttpGet()]
		public async Task<ActionResult<ServiceResponse<List<GetPlaylistResponse>>>> GetPlaylists()
		{
			var userId = _authService.GetUserId();
			var response = await _playlistService.GetAllPlaylists(userId);

			//TODO: If Not authorised return guest playlist data.
			
			return response;
		}

		[HttpGet("{uid}")]
		public async Task<ActionResult<ServiceResponse<GetPlaylistResponse>>> GetPlaylist(string uid)
		{
			var response = await _playlistService.GetPlaylistByUID(uid);

			return response;
		}

        [Authorize]
        [HttpPost("song")]
		public async Task<ActionResult<ServiceResponse<GetPlaylistSongResponse>>> AddSong(string playlistId, string trackId)
		{
            var userId = _authService.GetUserId();
			var response = await _playlistService.AddSong(userId, playlistId, trackId);
            Console.WriteLine(response.Data);
			return response;
		}

        [Authorize]
        [HttpDelete("{uid}")]
		public async Task<ActionResult<ServiceResponse<GetPlaylistSongResponse>>> RemoveSong(string song, string uid)
		{   
            var userId = _authService.GetUserId();
			var response = await _playlistService.RemoveSong(userId, uid, song);

			return response;
		}

        [HttpGet("trending")]
		public async Task<ActionResult<ServiceResponse<List<GetTrendingPlaylistResponse>>>> GetTrendingPlaylists()
		{
			var response = await _playlistService.GetTrending();
            Console.WriteLine(response.Data);
			return response;
		}

        // [HttpPost("imagetest")]
        // public async Task<ActionResult<ServiceResponse<string>>> UploadImage(IFormFile image, [FromQuery]string title)
        // {
        //     Console.WriteLine(title);
		// 	var response = await _imageService.UploadImage(image);

        //     return response;
        // }
    }
}