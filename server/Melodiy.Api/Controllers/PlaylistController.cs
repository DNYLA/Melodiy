using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Services.Playlist;
using Melodiy.Contracts.Playlist;
using Melodiy.Contracts.Track;
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
    [HttpPost("{id}")]
    public async Task<ActionResult<GetTrackResponse>> AddTrack(string id, [FromQuery] string trackId, [FromClaims] UserClaims user)
    {
        var response = await _playlistService.AddTrack(id, trackId, user.Id);
        return response.Adapt<GetTrackResponse>();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<GetTrackResponse>> RemoveTrack(string id, [FromQuery] string trackId, [FromClaims] UserClaims user)
    {
        var response = await _playlistService.RemoveTrack(id, trackId, user.Id);
        return response.Adapt<GetTrackResponse>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetPlaylistResponse>> GetPlaylist(string id, [FromClaims] UserClaims? user)
    {
        var response = await _playlistService.Get(id, user?.Id);
        return response.Adapt<GetPlaylistResponse>();
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