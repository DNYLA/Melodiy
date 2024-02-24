using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.PlayerService;
using Melodiy.Contracts.Player;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web.Http;
using System.Net;
using CollectionType = Melodiy.Application.Services.PlayerService.CollectionType;
using PlayerMode = Melodiy.Application.Services.PlayerService.PlayerMode;

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
        if (req.Position < 0)
        {
            req.Position = 0;
        }

        CollectionType type = req.Type.Adapt<CollectionType>();
        var response = await _playerService.Play(req.TrackId, type, req.CollectionId, Application.Services.PlayerService.PlayerType.Normal, PlayerMode.NoRepeat, claims);
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

    [Authorize]
    [HttpPost("previous")]
    public async Task<GetPlayerResponse> Previous(NextTrackRequest req, [FromClaims] UserClaims claims)
    {
        CollectionType type = req.Type.Adapt<CollectionType>();
        var response = await _playerService.Previous(req.TrackId, req.CollectionId, type, claims);

        return response.Adapt<GetPlayerResponse>();
    }

    [Authorize]
    [HttpPost("control")]
    public async Task<GetPlayerResponse> Control(NextTrackRequest req, [FromQuery] Contracts.PlayerType? type, [FromQuery] Contracts.PlayerMode? mode, [FromClaims] UserClaims claims)
    {
        var response = new PlayerResponse();
        if (!type.HasValue && !mode.HasValue)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Type and Mode cannot both be empty.");
        }

        CollectionType collectionType = req.Type.Adapt<CollectionType>();

        if (mode.HasValue)
        {
            PlayerMode playerMode = mode.Adapt<PlayerMode>();
            response = await _playerService.Mode(req.TrackId, req.CollectionId, collectionType, playerMode, claims);
        }

        if (type.Equals(Contracts.PlayerType.Normal))
        {
            response = await _playerService.Play(req.TrackId, collectionType, req.CollectionId, PlayerType.Normal, PlayerMode.NoRepeat, claims);
        }
        else if (type.Equals(Contracts.PlayerType.Shuffle))
        {
            PlayerType playerTypeConverted = type.Adapt<PlayerType>();
            response = await _playerService.Shuffle(req.TrackId, req.CollectionId, collectionType, playerTypeConverted, claims);
        }

        return response.Adapt<GetPlayerResponse>();
    }
}