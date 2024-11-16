namespace Melodiy.Features.Admin;

using Melodiy.Features.Authentication;
using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common;
using Melodiy.Features.User.Entities;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[ApiController]
[Route("api/[controller]")]
[DisableSetupControllerFilter]
public sealed class SetupController(IMemoryCache memoryCache, IAuthenticationService authenticationService)
    : ControllerBase
{
    [HttpGet]
    public IActionResult Setup()
    {
        return Accepted();
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Register(RegisterRequestModel registerRequestModel)
    {
        var response = await authenticationService.Register(registerRequestModel, Role.Owner);
        SetRefreshToken(response.RefreshToken);

        memoryCache.Remove(CacheKeyConst.SetupAlreadyInitialisedKey);

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