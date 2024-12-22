namespace Melodiy.Features.Authentication;

using System.Net;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Authentication.Jwt;
using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Authentication.Repository;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.User;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Models;
using Melodiy.Integrations.Common;

public sealed class AuthenticationService(
    IJwtTokenGenerator jwtTokenGenerator,
    IHashService hashService,
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository) : IAuthenticationService
{
    public async Task<AuthenticationResult> ValidateLogin(LoginRequestModel request)
    {
        var user = await userRepository.GetByUsername(request.Username);

        if (user == null || !hashService.ValidateSecure(request.Password, user.Password))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid Credentials");
        }

        var token = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username);
        var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

        return new AuthenticationResult
        {
            User = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
            },
            AccessToken = token,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthenticationResult> Register(RegisterRequestModel request, Role role)
    {
        if (await userRepository.ExistsAsync(request.Username))
        {
            throw new ApiException(HttpStatusCode.Conflict, "Username already exists");
        }

        var hashedPassword = hashService.Secure(request.Password);
        var user = await userRepository.AddAsync(request.Username, hashedPassword, role);
        var token = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username);
        var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

        return new AuthenticationResult
        {
            User = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
            },
            AccessToken = token,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthenticationResult> RefreshToken(string refreshToken)
    {
        var tokenDetails = await refreshTokenRepository.WithUser().GetAsync(refreshToken);

        if (tokenDetails == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        if (tokenDetails.Expires < DateTime.UtcNow)
        {
            await refreshTokenRepository.DeleteExpiredAsync(tokenDetails.UserId, DateTime.UtcNow);

            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var accessToken = jwtTokenGenerator.GenerateAccessToken(tokenDetails.User.Id, tokenDetails.User.Username);
        var newRefreshToken = jwtTokenGenerator.GenerateRefreshToken();

        tokenDetails.Token = newRefreshToken.Token;
        tokenDetails.Expires = newRefreshToken.Expires;
        await refreshTokenRepository.SaveAsync(tokenDetails);

        return new AuthenticationResult()
        {
            User = new UserViewModel
            {
                Id = tokenDetails.User.Id,
                Username = tokenDetails.User.Username,
            },
            AccessToken = accessToken,
            RefreshToken = newRefreshToken
        };
    }

    public async Task RemoveRefreshToken(string refreshToken, int userId)
    {
        var tokenDetails = await refreshTokenRepository.WithUser().GetAsync(refreshToken);

        if (tokenDetails == null)
        {
            return;
        }
        else if (tokenDetails.UserId != userId)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        await refreshTokenRepository.DeleteAsync(tokenDetails);
    }

    private async Task<RefreshTokenModel> CreateRefreshToken(int userId, string? userAgent)
    {
        //TODO: Should we verify previously created refresh tokens and prune any old ones?
        var tokenDetails = jwtTokenGenerator.GenerateRefreshToken();

        await refreshTokenRepository.AddAsync(new RefreshToken
        {
            Token = tokenDetails.Token,
            Expires = tokenDetails.Expires,
            UserId = userId,
            UserAgent = userAgent
        });

        return new RefreshTokenModel
        {
            Token = tokenDetails.Token,
            Expires = tokenDetails.Expires
        };
    }
}