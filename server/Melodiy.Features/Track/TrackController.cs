﻿namespace Melodiy.Features.Track;

using MediatR;

using Melodiy.Features.Album.Command;
using Melodiy.Features.Artist.Command;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Track.Command;
using Melodiy.Features.Track.Models;
using Melodiy.Features.Track.Query;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("api/[controller]")]
public class TrackController(IUserService userService, IMediator mediator) : ControllerBase
{
    private readonly IUserService _userService = userService;

    private readonly IMediator _mediator = mediator;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<TrackViewModel>> Create([FromForm] CreateTrackRequest request, [FromQuery(Name = "public")] bool isPublic, [FromQuery(Name = "encrypted")] bool isEncrypted)
    {
        var user = await _userService.GetUserDetails();
        request.Public = isPublic;

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        if (string.IsNullOrWhiteSpace(request.ArtistId) && string.IsNullOrWhiteSpace(request.ArtistName))
        {
            throw new ApiException(HttpStatusCode.BadRequest, "ArtistId or a new artist name must be provided");
        }

        if (!string.IsNullOrWhiteSpace(request.ArtistId) && !string.IsNullOrWhiteSpace(request.ArtistName))
        {
            throw new ApiException(HttpStatusCode.BadRequest,
                                   "Provide an ArtistId or a new artist both cannot be chosen at the same time.");
        }

        if (!string.IsNullOrWhiteSpace(request.ArtistName))
        {
            var createdArtist = await _mediator.Send(new CreateArtistCommand
            {
                Name = request.ArtistName,
                UserId = user.Id
            });

            request.ArtistId = createdArtist.Slug;
        }

        if (!string.IsNullOrWhiteSpace(request.AlbumTitle))
        {
            var createdAlbum = await _mediator.Send(new CreateAlbumCommand
            {
                Title = request.AlbumTitle,
                ArtistSlug = request.ArtistId!,
                Timestamp = 0,
                Image = request.Image,
                UserId = user.Id
            });

            request.AlbumId = createdAlbum.Slug;
        }

        if (string.IsNullOrWhiteSpace(request.AlbumId) && string.IsNullOrWhiteSpace(request.ArtistId))
        {
            throw new ApiException(HttpStatusCode.BadRequest,
                                   "Provide an AlbumId or a new album both cannot be chosen at the same time.");
        }

        var response = await _mediator.Send(new CreateTrackCommand
        {
            Title = request.Title,
            Explicit = true,
            Audio = request.Audio,
            Image = request.Image,
            Public = request.Public,
            Encrypted = isEncrypted,
            ArtistId = request.ArtistId!,
            AlbumId = request.AlbumId,
            UserId = user.Id
        });

        return response.ToViewModel();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TrackViewModel>> Get(string id)
    {
        var user = await _userService.GetUserDetails();
        var response = await _mediator.Send(new GetTrackQuery
        {
            Slug = id,
            UserId = user?.Id,
            IncludeImage = true
        });

        return response.ToViewModel();
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<TrackViewModel>>> GetUserTracks()
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var response = await _mediator.Send(new GetUserTracksQuery(user.Id));

        return response.Select(track => track.ToViewModel()).ToList();
    }
}