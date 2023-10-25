using melodiy.server.Dtos.Album;
using melodiy.server.Services.AlbumService;
using melodiy.server.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly IAuthService _authService;
        public AlbumController(IAlbumService albumService, IAuthService authService)
        {
            _authService = authService;
            _albumService = albumService;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetFullAlbumResponse>>> GetAlbum(string id)
        {
            ServiceResponse<GetFullAlbumResponse> response = await _albumService.GetAlbum(id);

            return response;
        }
    }
}