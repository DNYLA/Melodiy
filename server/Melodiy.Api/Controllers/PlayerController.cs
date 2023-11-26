using System.Reflection.Metadata.Ecma335;
using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Services.PlayerService;
using Melodiy.Contracts;
using Melodiy.Contracts.Player;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CollectionType = Melodiy.Application.Services.PlayerService.CollectionType;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;
    public PlayerController(IPlayerService playerService)
    {
        _playerService = playerService;
    }


    [HttpPost("play")]
    public async Task<GetPlayerResponse> Play(PlayRequest req, [FromClaims] UserClaims? claims)
    {
        CollectionType type = req.Type.Adapt<CollectionType>();
        var response = await _playerService.Play(req.TrackId, type, req.CollectionId, req.Position, req.Shuffle, claims);
        return response.Adapt<GetPlayerResponse>();
    }

    [Authorize]
    [HttpPost("next")]
    public async Task<GetPlayerResponse> Next(NextTrackRequest req, [FromClaims] UserClaims claims)
    {
        CollectionType type = req.Type.Adapt<CollectionType>();
        var response = await _playerService.Next(req.TrackId, req.CollectionId, type, claims);

        return response.Adapt<GetPlayerResponse>();
    }
}