using System.Net;
using System.Security.Claims;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.Playlist;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistService _playlistService;
    public PlaylistController(IPlaylistService playlistService)
    {
        _playlistService = playlistService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<PlaylistResponse>> Create([FromBody] IFormFile? image, [FromQuery] string title, [FromQuery(Name = "public")] bool isPublic)
    {
        //TODO: Move to a seperate service / middleware to parse this data.
        var userIdString = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
        int userId = int.Parse(userIdString ?? throw new ApiError(HttpStatusCode.Unauthorized, "User not found"));
        var response = await _playlistService.Create(image, userId, title, isPublic);

        //Map to PlaylistResponse

        return response;
    }
}