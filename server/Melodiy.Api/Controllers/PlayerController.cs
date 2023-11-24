using System.Reflection.Metadata.Ecma335;
using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Services.PlayerService;
using Melodiy.Contracts;
using Melodiy.Contracts.Player;
using Microsoft.AspNetCore.Mvc;

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
        Application.Services.PlayerService.CollectionType type = req.Type.Adapt<Application.Services.PlayerService.CollectionType>();
        var response = await _playerService.Play(req.TrackId, type, req.CollectionId, req.Position, req.Shuffle, claims);
        return response.Adapt<GetPlayerResponse>();
    }
}