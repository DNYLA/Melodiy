namespace Melodiy.Features.Admin;

using Melodiy.Features.Authentication;
using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common;
using Melodiy.Features.User.Entities;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[ApiController]
[Route("[controller]")]
[DisableSetupControllerFilter]
public sealed class SetupController(IMemoryCache memoryCache, IAuthenticationService authenticationService)
    : ControllerBase
{
    private readonly IMemoryCache _memoryCache = memoryCache;

    private readonly IAuthenticationService _authenticationService = authenticationService;

    [HttpGet]
    public IActionResult Setup()
    {
        return Accepted();
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Regoster(RegisterRequestModel registerRequestModel)
    {
        var response = await _authenticationService.Register(registerRequestModel, Role.Owner);
        SetRefreshToken(response.RefreshToken);

        _memoryCache.Remove(CacheKeyConst.SetupAlreadyInitialisedKey);

        return new AuthenticationResultViewModel
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    private void SetRefreshToken(RefreshTokenModel token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = token.Expires
        };

        Response.Cookies.Append("refreshToken", token.Token, cookieOptions);
    }
}