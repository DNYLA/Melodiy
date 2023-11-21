using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
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
    public async Task<ActionResult<GetTrackResponse>> Create([FromForm] UploadTrackRequest request)
    {
        //TODO: Move to a seperate service / middleware to parse this data.
        var userIdString = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
        var username = User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value!;
        int userId = int.Parse(userIdString ?? throw new ApiError(HttpStatusCode.Unauthorized, "User not found"));

        var response = await _trackService.UploadSong(request, userId);

        return response.Adapt<GetTrackResponse>();
    }
}