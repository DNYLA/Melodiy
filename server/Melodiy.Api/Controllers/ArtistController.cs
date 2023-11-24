using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Contracts.Artist;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ArtistController : ControllerBase
{
    private readonly IArtistService _artistService;
    public ArtistController(IArtistService ArtistService)
    {
        _artistService = ArtistService;
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<GetArtistResponse>> Create(string name, [FromForm] IFormFile? image, [FromClaims] UserClaims user)
    {
        var response = await _artistService.Create(name, image, user.Username, user.Id);

        return response.Adapt<GetArtistResponse>();
    }
}