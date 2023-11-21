using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Melodiy.Api.Attributes;
using Melodiy.Api.Filters;
using Melodiy.Api.Models;
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
    public async Task<ActionResult<GetPlaylistResponse>> Create([FromForm] IFormFile? image, [FromQuery] string title, [FromQuery(Name = "public")] bool isPublic, [FromClaims] UserClaims user)
    {
        var response = await _playlistService.Create(image, user.Username, user.Id, title, isPublic);
        var mapped = response.Adapt<GetPlaylistResponse>();

        return mapped;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<GetPlaylistResponse>>> GetAll([FromClaims] UserClaims user)
    {
        var response = await _playlistService.GetAll(user.Id);

        //TODO: If Not authorised return guest playlist data (for not auth is required).

        return response.Adapt<List<GetPlaylistResponse>>();
    }
}