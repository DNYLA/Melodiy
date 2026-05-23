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
    /// <summary>
    /// Authenticates the user using the provided credentials, issues an access token, and sets the refresh-token HTTP cookie.
    /// </summary>
    /// <param name="loginRequestModel">The login request containing user credentials (for example, email/username and password).</param>
    /// <returns>An <see cref="AuthenticationResponse"/> containing the authenticated user and a new access token.</returns>
    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResponse>> Login(LoginRequest loginRequestModel)
    {
        var response = await authenticationService.ValidateLogin(loginRequestModel);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResponse
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    /// <summary>
    /// Registers a new user, stores a refresh token in an HTTP cookie, and returns authentication data.
    /// </summary>
    /// <param name="registerRequestModel">The registration request containing user credentials and profile details.</param>
    /// <returns>An AuthenticationResponse containing the created user and an access token.</returns>
    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResponse>> Register(RegisterRequest registerRequestModel)
    {
        var response = await authenticationService.Register(registerRequestModel, UserRole.Default);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResponse
        {
            User = response.User,
            AccessToken = response.AccessToken
        };
    }

    /// <summary>
    /// Logs out the current user by expiring the refresh-token cookie and removing the refresh token from the server if present.
    /// </summary>
    /// <remarks>
    /// Expires the "refreshToken" HTTP cookie on the client and, when a cookie value exists, requests the authentication service to remove that refresh token for the current user.
    /// </remarks>
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

    /// <summary>
    /// Exchanges the refresh token from the request cookie for a new access token and refresh token, updates the refresh token cookie, and returns authentication data.
    /// </summary>
    /// <returns>An <see cref="AuthenticationResponse"/> containing the authenticated user and a new access token.</returns>
    /// <exception cref="ApiException">Thrown with status 401 (Unauthorized) when the refresh token is missing, invalid, or the exchange fails.</exception>
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
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Refresh token exchange failed");
            ExpireCookie();
            throw new ApiException(HttpStatusCode.Unauthorized);
        }
    }

    /// <summary>
        /// Sets the "refreshToken" cookie on the HTTP response using the provided token and its expiration.
        /// </summary>
        /// <param name="token">Refresh token value and expiration used to set the cookie.</param>
        private void SetRefreshToken(RefreshTokenResponse token) =>
        Response.Cookies.Append("refreshToken", token.Token, CreateRefreshCookieOptions(token.Expires));

    /// <summary>
        /// Expires the "refreshToken" HTTP cookie so the client will discard it.
        /// </summary>
        private void ExpireCookie() =>
        Response.Cookies.Append("refreshToken", string.Empty, CreateRefreshCookieOptions(timeProvider.UtcNow().AddDays(-1)));

    /// <summary>
    /// Create CookieOptions configured for the refresh-token cookie.
    /// </summary>
    /// <param name="expires">The expiration timestamp to assign to the cookie.</param>
    /// <returns>
    /// A CookieOptions instance with HttpOnly enabled, SameSite set to Strict, Path set to "/", a Secure flag that is true unless running in development without HTTPS, and the provided expiration.
    /// </returns>
    private CookieOptions CreateRefreshCookieOptions(DateTimeOffset expires) => new()
    {
        HttpOnly = true,
        SameSite = SameSiteMode.Strict,
        Path = "/",
        Secure = !hostEnvironment.IsDevelopment() || Request.IsHttps,
        Expires = expires
    };
}
