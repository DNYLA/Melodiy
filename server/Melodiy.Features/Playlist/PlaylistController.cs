﻿namespace Melodiy.Features.Playlist;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("[controller]")]
public sealed class PlaylistController(IPlaylistService playlistService, IUserService userService) : ControllerBase
{
    private readonly IPlaylistService _playlistService = playlistService;

    private readonly IUserService _userService = userService;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<PlaylistViewModel>> Create([FromQuery] string title,
                                                              [FromQuery(Name = "public")] bool isPublic,
                                                              [FromForm] IFormFile? image)
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var request = new CreatePlaylistRequest
        {
            Title = title,
            Public = isPublic,
            Image = image,
            UserId = user!.Id
        };

        var response = await _playlistService.Create(request);

        return new PlaylistViewModel
        {
            Id = response.Slug,
            Title = response.Title,
            Public = response.Public,
            Tracks = response.Tracks,
            User = user.ToViewModel(),
            Image = response.Image?.Url,
            CreatedAt = response.CreatedAt
        };
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PlaylistViewModel>> Get(string id)
    {
        var user = await _userService.GetUserDetails();

        var response = await _playlistService.Get(id, user?.Id);

        return new PlaylistViewModel
        {
            Id = response.Slug,
            Title = response.Title,
            Public = response.Public,
            Tracks = response.Tracks,
            User = user.ToViewModel(),
            Image = response.Image?.Url,
            CreatedAt = response.CreatedAt
        };
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<PlaylistViewModel>>> GetAll()
    {
        var user = await _userService.GetUserDetails();

        //TODO: If Not authorised return guest playlist data (for not auth is required).
        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var response = await _playlistService.GetAll(user.Id);

        return response.Select(playlist => new PlaylistViewModel
        {
            Id = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            Tracks = playlist.Tracks,
            User = user.ToViewModel(),
            Image = playlist.Image?.Url,
            CreatedAt = playlist.CreatedAt
        }).ToList();
    }

    //[Authorize]
    //[HttpPost("{id}")]
    //public async Task<ActionResult<GetTrackResponse>> AddTrack(string id, [FromQuery] string trackId,
    //                                                           [FromClaims] UserClaims user)
    //{
    //    var response = await _playlistService.AddTrack(id, trackId, user.Id);
    //    return response.Adapt<GetTrackResponse>();
    //}

    //[Authorize]
    //[HttpDelete("{id}")]
    //public async Task<ActionResult<GetTrackResponse>> RemoveTrack(string id, [FromQuery] string trackId,
    //                                                              [FromClaims] UserClaims user)
    //{
    //    var response = await _playlistService.RemoveTrack(id, trackId, user.Id);
    //    return response.Adapt<GetTrackResponse>();
    //}

    //[HttpGet("{id}")]
    //public async Task<ActionResult<GetPlaylistResponse>> GetPlaylist(string id, [FromClaims] UserClaims? user)
    //{
    //    var response = await _playlistService.Get(id, user?.Id);
    //    return response.Adapt<GetPlaylistResponse>();
    //}
}