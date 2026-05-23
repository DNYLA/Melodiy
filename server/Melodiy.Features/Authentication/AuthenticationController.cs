namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Contracts.Requests;
using Melodiy.Features.Authentication.Contracts.Responses;
using Melodiy.Features.Authentication.Services;
using Melodiy.Features.Common;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.User.Enums;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Net;

[Route("api/auth")]
public class AuthenticationController(
    IAuthenticationService authenticationService,
    IHostEnvironment hostEnvironment,
    TimeProvider timeProvider,
    ILogger<AuthenticationController> logger) : BaseController
{
    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResponse>> Login(LoginRequest loginRequestModel)
    {
        var response = await authenticationService.ValidateLogin(loginRequestModel, UserAgent);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResponse
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResponse>> Register(RegisterRequest registerRequestModel)
    {
        var response = await authenticationService.Register(registerRequestModel, UserAgent);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResponse
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task Logout()
    {
        var userId = GetCurrentUserId()!;
        var refreshToken = Request.Cookies["refreshToken"];
        ExpireCookie();

        if (!string.IsNullOrWhiteSpace(refreshToken))
        {
            await authenticationService.RemoveRefreshToken(refreshToken, userId);
        }
    }

    [HttpPost("refresh_token")]
    public async Task<ActionResult<AuthenticationResponse>> RefreshToken()
    {
        // TODO: Important RefreshToken should validate UserAgent, IP, etc
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            ExpireCookie();
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        try
        {
            var response = await authenticationService.RefreshToken(refreshToken);
            SetRefreshToken(response.RefreshToken);

            return new AuthenticationResponse
            {
                User = response.User,
                AccessToken = response.AccessToken
            };
        }
        catch (ApiException)
        {
            ExpireCookie();
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Refresh token exchange failed");
            ExpireCookie();
            throw new ApiException(HttpStatusCode.Unauthorized);
        }
    }

    private void SetRefreshToken(RefreshTokenResponse token) =>
        Response.Cookies.Append("refreshToken", token.Token, CreateRefreshCookieOptions(token.Expires));

    private void ExpireCookie() =>
        Response.Cookies.Append("refreshToken", string.Empty, CreateRefreshCookieOptions(timeProvider.UtcNow().AddDays(-1)));

    private CookieOptions CreateRefreshCookieOptions(DateTimeOffset expires) => new()
    {
        HttpOnly = true,
        SameSite = SameSiteMode.Strict,
        Path = "/",
        Secure = !hostEnvironment.IsDevelopment() || Request.IsHttps,
        Expires = expires
    };
}
