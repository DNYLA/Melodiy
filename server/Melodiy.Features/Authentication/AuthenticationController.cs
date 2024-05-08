namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common.Exceptions;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net;

using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("auth")]
public sealed class AuthenticationController(IAuthenticationService authenticationService, IUserService userService) : ControllerBase
{
    private readonly IAuthenticationService _authenticationService = authenticationService;

    private readonly IUserService _userService = userService;

    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Login(LoginRequestModel loginRequestModel)
    {
        var response = await _authenticationService.ValidateLogin(loginRequestModel);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResultViewModel
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Register(RegisterRequestModel registerRequestModel)
    {
        var response = await _authenticationService.Register(registerRequestModel);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResultViewModel
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task Logout()
    {
        var user = await _userService.GetUserDetails();
        var refreshToken = Request.Cookies["refreshToken"];

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            ExpireCookie();
        }
        else
        {
            await _authenticationService.RemoveRefreshToken(refreshToken, user.Id);
        }
    }

    [HttpGet("refresh_token")]
    public async Task<ActionResult<AuthenticationResultViewModel>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            ExpireCookie();
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        try
        {
            var response = await _authenticationService.RefreshToken(refreshToken);
            SetRefreshToken(response.RefreshToken);

            return new AuthenticationResultViewModel
            {
                User = response.User,
                AccessToken = response.AccessToken
            };
        }
        catch (Exception ex)
        {
            //TODO: Log
            ExpireCookie();
            throw new ApiException(HttpStatusCode.Unauthorized);
        }
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

    private void ExpireCookie()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(-1)
        };

        Response.Cookies.Append("refreshToken", string.Empty, cookieOptions);
    }
}