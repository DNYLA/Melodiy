using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.Playlist;
using Melodiy.Contracts.Playlist;
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
    public async Task<ActionResult<GetPlaylistResponse>> Create([FromForm] IFormFile? image, [FromQuery] string title, [FromQuery(Name = "public")] bool isPublic)
    {
        //TODO: Move to a seperate service / middleware to parse this data.
        var userIdString = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
        var username = User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value!;
        int userId = int.Parse(userIdString ?? throw new ApiError(HttpStatusCode.Unauthorized, "User not found"));

        var response = await _playlistService.Create(image, username, userId, title, isPublic);

        var mapped = response.Adapt<GetPlaylistResponse>();

        return mapped;
    }
}