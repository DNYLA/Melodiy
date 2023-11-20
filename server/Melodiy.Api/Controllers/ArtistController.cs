using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ArtistController : ControllerBase
{
    // private readonly IArtistService _ArtistService;
    // public ArtistController(IArtistService ArtistService)
    // {
    //     _ArtistService = ArtistService;
    // }


    [HttpGet()]
    public async Task<ActionResult<bool>> Get()
    {
        return true;
    }
}