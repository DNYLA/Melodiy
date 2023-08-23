using melodiy.server.Dtos.Song;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.SongService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
	[ApiController]
	[Route("api/[controller]")]
    public class SongController : ControllerBase
    {
		private readonly ISongService _songService;
    	private readonly IAuthService _authService;
		public SongController(ISongService songService, IAuthService authService, IMapper iMapper)
		{
      		_authService = authService;
      		_songService = songService;
		}


		[Authorize]
       	[HttpPost]
		public async Task<ActionResult<ServiceResponse<GetSongResponse>>> Create([FromForm] UploadSongRequest request)
		{
			var response = await _songService.UploadSong(request);
			// var response = new ServiceResponse<GetSongResponse>();

            Console.WriteLine(request.Audio.FileName);
            Console.WriteLine(request.Image?.FileName);

			return response;
		}

        [Authorize]
        [HttpGet()]
		public async Task<ActionResult<ServiceResponse<List<GetSongResponse>>>> GetUserSongs()
		{
            var userId = _authService.GetUserId();
			var response = await _songService.GetUserSongs(userId);

			return response;
		}

        [HttpGet("{id}")]
		public async Task<ActionResult<ServiceResponse<GetSongResponse>>> GetUserSongs(string id)
		{
            //TODO: Add Authorsiation
            // var userId = _authService.GetUserId();
			var response = await _songService.GetSong(id);

			return response;
		}


        [Authorize]
        [HttpDelete("{id}")]
		public async Task<ActionResult<ServiceResponse<GetSongResponse>>> DeleteSong(string id)
		{
            var userId = _authService.GetUserId();
			var response = await _songService.DeleteSong(id, userId);

			return response;
		}
    }
}