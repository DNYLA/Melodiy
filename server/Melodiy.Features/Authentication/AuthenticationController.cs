namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.User;
using Melodiy.Features.User.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("api/auth")]
public sealed class AuthenticationController(IAuthenticationService authenticationService, IUserService userService)
    : ControllerBase
{
    [HttpPost("info")]
    public async Task<ActionResult<AuthenticationInfoResponse>> GetLoginInfo(AuthenticationInfoRequest authInfoRequest)
    {
        var response = await authenticationService.CreateSrpSession(authInfoRequest.Username);

        return response;
    }

    [HttpPost]
    public async Task<ActionResult<AuthenticationResultViewModel>> ValidateAuth(AuthenticationRequestModel authRequestModel)
    {
        var response = await authenticationService.ValidateAuth(authRequestModel);
        SetRefreshToken(response.RefreshToken);

        return new AuthenticationResultViewModel
        {
            User = response.User,
            ServerProof = response.ServerProof,
            AccessToken = response.AccessToken
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Register(RegisterRequestModel registerRequestModel)
    {
        var response = await authenticationService.Register(registerRequestModel, Role.User);
        SetRefreshToken(response.RefreshToken);

        return Ok(new AuthenticationResultViewModel
        {
            User = response.User,
            AccessToken = response.AccessToken
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task Logout()
    {
        var user = await userService.GetUserDetails();
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
            await authenticationService.RemoveRefreshToken(refreshToken, user.Id);
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
            var response = await authenticationService.RefreshToken(refreshToken);
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