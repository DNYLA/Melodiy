namespace Melodiy.Features.Artist;

using MediatR;

using Melodiy.Features.Artist.Command;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Artist.Query;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("[controller]")]
public class ArtistController(IUserService userService, IMediator mediator) : ControllerBase
{
    private readonly IUserService _userService = userService;

    private readonly IMediator _mediator = mediator;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ArtistViewModel>> Create(string name, [FromForm] IFormFile? image)
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var response = await _mediator.Send(new CreateArtistCommand
        {
            Name = name,
            UserId = user.Id,
            Image = image
        });

        return response.ToViewModel();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ArtistViewModel>> GetArtist(string id)
    {
        var response = await _mediator.Send(new GetArtistQuery
        {
            Slug = id,
            IncludeImage = true
        });

        if (response == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"[Artist] Id: {id} not found");
        }

        return response.ToViewModel();
    }
}