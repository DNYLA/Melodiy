namespace Melodiy.Features.Album;

using MediatR;

using Melodiy.Features.Album.Command;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Album.Query;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
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
    // public async Task<ActionResult<GetAlbumResponse>> Create(string title, long releaseTimestamp, [FromForm] IFormFile? image)
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
        var response = await _mediator.Send(new GetAlbumQuery
        {
            ArtistSlug = id
        });

        if (response == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"[Album] Id {id} not found");
        }

        return response.ToViewModel();
    }
}