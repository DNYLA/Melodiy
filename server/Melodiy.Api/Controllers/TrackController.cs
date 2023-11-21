using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Melodiy.Api.Attributes;
using Melodiy.Api.Models;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.TrackService;
using Melodiy.Contracts.Track;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TrackController : ControllerBase
{
    private readonly ITrackService _trackService;
    public TrackController(ITrackService trackService)
    {
        _trackService = trackService;
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<GetTrackResponse>> Create([FromForm] UploadTrackRequest request, [FromClaims] UserClaims user)
    {
        var response = await _trackService.UploadSong(request, user.Username, user.Id);

        return response.Adapt<GetTrackResponse>();
    }
}