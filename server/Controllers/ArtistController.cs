using melodiy.server.Dtos.Artist;
using melodiy.server.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using server.Services.ArtistService;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
    [ApiController]
    [Route("[controller]")]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistService _artistService;
        private readonly IAuthService _authService;
        public ArtistController(IArtistService artistService, IAuthService authService, IMapper iMapper)
        {
            _authService = authService;
            _artistService = artistService;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetArtistInfoResponse>>> GetArtistInfo(string id)
        {
            ServiceResponse<GetArtistInfoResponse> response = await _artistService.Get(id);
            // var response = new ServiceResponse<GetSongResponse>();

            return response;
        }
    }
}