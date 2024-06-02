namespace Melodiy.Features.Player;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Player.Enums;
using Melodiy.Features.Player.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("api/[controller]")]
public class PlayerController(IPlayerService playerService, IUserService userService) : ControllerBase
{
    private readonly IPlayerService _playerService = playerService;

    private readonly IUserService _userService = userService;

    [HttpPost("play")]
    public async Task<PlayerViewModel> Play(PlayRequest req)
    {
        var user = await _userService.GetUserDetails();

        if (req.Position < 0)
        {
            req.Position = 0;
        }

        if (string.IsNullOrWhiteSpace(req.TrackId))
        {
            throw new ApiException(HttpStatusCode.NotImplemented);
        }

        return await _playerService.Play(req.TrackId, req.Collection, req.CollectionId, PlayerShuffle.Normal,
                                         PlayerMode.NoRepeat, user);
    }

    [Authorize]
    [HttpPost("next")]
    public async Task<PlayerViewModel> Next(NextTrackRequest req)
    {
        var user = await _userService.GetUserDetails();
        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        return await _playerService.Next(req.TrackId, req.CollectionId, req.Collection, user);
    }

    [Authorize]
    [HttpPost("previous")]
    public async Task<PlayerViewModel> Previous(NextTrackRequest req)
    {
        var user = await _userService.GetUserDetails();
        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        return await _playerService.Previous(req.TrackId, req.CollectionId, req.Collection, user);
    }

    [Authorize]
    [HttpPost("control")]
    public async Task<PlayerViewModel> Control(NextTrackRequest req, [FromQuery] PlayerShuffle? shuffle,
                                               [FromQuery] PlayerMode? mode)
    {
        var user = await _userService.GetUserDetails();
        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var response = new PlayerViewModel();
        if (!shuffle.HasValue && !mode.HasValue)
        {
            throw new ApiException(HttpStatusCode.BadRequest, "Collection and Mode cannot both be empty.");
        }

        if (mode is not null)
        {
            return await _playerService.Mode(req.TrackId, req.CollectionId, req.Collection, mode.Value, user);
        }

        return shuffle switch
        {
            PlayerShuffle.Normal => await _playerService.Play(req.TrackId, req.Collection, req.CollectionId,
                                                              PlayerShuffle.Normal, PlayerMode.NoRepeat, user),
            PlayerShuffle.Shuffle => await _playerService.Shuffle(req.TrackId, req.CollectionId, req.Collection,
                                                                  PlayerShuffle.Shuffle, user),
            _ => response
        };
    }
}