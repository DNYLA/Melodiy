using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Contracts.Album;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AlbumController : ControllerBase
{
    private readonly IAlbumService _albumService;
    public AlbumController(IAlbumService albumService)
    {
        _albumService = albumService;
    }


    [Authorize]
    [HttpPost]
    // public async Task<ActionResult<GetAlbumResponse>> Create(string title, long releaseTimestamp, [FromForm] IFormFile? image, [FromClaims] UserClaims user)
    public async Task<ActionResult<GetAlbumResponse>> Create([FromForm] CreateAlbumRequest request, [FromClaims] UserClaims user)
    {
        var response = await _albumService.Create(request.Title, request.ArtistId, request.Timestamp, request.Image, user.Username, user.Id);
        return response.Adapt<GetAlbumResponse>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetAlbumResponse>> Get(string id)
    {
        Console.WriteLine("Fetching");
        var response = await _albumService.Get(id, true);

        Console.WriteLine("Returning");


        return response.Adapt<GetAlbumResponse>();
    }
}