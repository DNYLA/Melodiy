namespace Melodiy.Features.Album;

using MediatR;

using Melodiy.Features.Album.Command;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Album.Query;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Track.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("[controller]")]
public class AlbumController(IUserService userService, IMediator mediator) : ControllerBase
{
    private readonly IUserService _userService = userService;

    private readonly IMediator _mediator = mediator;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<AlbumViewModel>> Create([FromForm] CreateAlbumRequest request)
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var response = await _mediator.Send(new CreateAlbumCommand
        {
            Title = request.Title,
            ArtistSlug = request.ArtistId,
            Timestamp = request.Timestamp,
            Verified = false,
            Image = request.Image,
            UserId = user.Id,
        });

        return response.ToViewModel();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AlbumViewModel>> Get(string id)
    {
        var response = await _mediator.Send(new GetAlbumQuery(id));

        if (response == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"[Album] Id {id} not found");
        }

        var model = response.ToViewModel();
        model.Tracks = response.Tracks.Select(track => new TrackViewModel
        {
            Id = track.Slug,
            Title = track.Title,
            Views = track.Views,
            // Public = track.Public,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            CreatedAt = track.CreatedAt,
            Album = response.ToPreview(),
            Artists = track.Artists.Select(artist => artist.ToPreview()).ToList(),
            User = track.User?.ToViewModel(),
            Image = track.Image.GetUrl(),
        }).ToList();

        return model;
    }
}