using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Melodiy.Api.Attributes;
using Melodiy.Api.Models;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
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
    private readonly IArtistService _artistService;
    private readonly IAlbumService _albumService;
    public TrackController(ITrackService trackService, IArtistService artistService, IAlbumService albumService)
    {
        _trackService = trackService;
        _artistService = artistService;
        _albumService = albumService;
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<GetTrackResponse>> Create([FromForm] UploadTrackRequest request, [FromQuery] string? artist, [FromQuery] string? album, [FromClaims] UserClaims user)
    {
        if (artist == null && request.ArtistId == null)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "ArtistId or a new artist name must be provided");
        }
        else if (request.ArtistId != null && artist != null)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Provide an ArtistId or a new artist both cannot be chosen at the same time.");
        }
        if (request.AlbumId != null && album != null)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Provide an AlbumId or a new album both cannot be chosen at the same time.");
        }

        if (artist != null)
        {
            var createdArtist = await _artistService.Create(artist, null, user.Username, user.Id);
            request.ArtistId = createdArtist.Slug;
        }
        if (album != null)
        {
            var createdAlbum = await _albumService.Create(album, request.ArtistId!, 0, null, user.Username, user.Id);
            request.AlbumId = createdAlbum.Slug;
        }

        var response = await _trackService.Create(request, user.Username, user.Id);
        return response.Adapt<GetTrackResponse>();
    }

    [Authorize]
    [HttpGet]
    public async Task<List<GetTrackResponse>> GetUserTracks(UserClaims user)
    {
        var tracks = await _trackService.GetUserTracks(user.Id);

        return tracks.Adapt<List<GetTrackResponse>>();
    }
}