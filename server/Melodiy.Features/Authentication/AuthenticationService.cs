namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Authentication.Jwt;
using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Authentication.Repository;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.User;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Models;

using Microsoft.Extensions.Caching.Memory;

using SecureRemotePassword;

using System.Net;
using System.Security.Cryptography;

public sealed class AuthenticationService(
    IJwtTokenGenerator jwtTokenGenerator,
    IUserRepository userRepository,
    IAuthenticationRepository authenticationRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IMemoryCache memoryCache) : IAuthenticationService
{
    private const string SessionCachePrefix = "srp-session";

    public async Task<AuthenticationInfoResponse> CreateSrpSession(string username)
    {
        var srpId = GenerateSessionId();
        var user = await authenticationRepository.GetByUsername(username);

        if (user == null)
        {
            //TODO: Return random server Ephemeral
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid Credentials");
        }

        var server = new SrpServer();
        var serverEphemeral = server.GenerateEphemeral(user.AuthenticationDetails.Verifier);
        
        memoryCache.Set($"{SessionCachePrefix}-{srpId}", serverEphemeral.Secret, TimeSpan.FromMinutes(5));

        return new AuthenticationInfoResponse
        {
            ServerEphemeral = serverEphemeral.Public,
            Salt = user.AuthenticationDetails.Salt,
            SrpSession = srpId
        };
    }

    private static string GenerateSessionId()
    {
        byte[] randomBytes = new byte[16]; // 16 bytes = 32 hexadecimal characters
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }

        // Convert to a hexadecimal string
        return BitConverter.ToString(randomBytes).Replace("-", "").ToLower();
    }

    public async Task<AuthenticationResult> ValidateAuth(AuthenticationRequestModel request)
    {
        var user = await authenticationRepository.GetByUsername(request.Username);

        if (user == null || !memoryCache.TryGetValue($"{SessionCachePrefix}-{request.SrpSession}", out string? serverEphemeralSecret) || string.IsNullOrWhiteSpace(serverEphemeralSecret))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid Credentials");
        }

        //server.DeriveSession() will throw an error if the details are incorrect
        try
        {
            var server = new SrpServer();
            var serverSession = server.DeriveSession(serverEphemeralSecret, request.ClientEphemeral, user.AuthenticationDetails.Salt, request.Username, user.AuthenticationDetails.Verifier, request.ClientProof);
            
            var token = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username);
            var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

            return new AuthenticationResult
            {
                User = new UserViewModel
                {
                    Id = user.Id,
                    Username = user.Username,
                    Avatar = user.Avatar
                },
                ServerProof = serverSession.Proof,
                AccessToken = token,
                RefreshToken = refreshToken
            };
        }
        catch (Exception)
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid Credentials");
        }
    }

    public async Task<AuthenticationResult> Register(RegisterRequestModel request, Role role)
    {
        if (await userRepository.ExistsAsync(request.Username))
        {
            throw new ApiException(HttpStatusCode.Conflict, "Username already exists");
        }

        var user = await userRepository.AddAsync(request.Username, request.Salt, request.Verifier, role);
        var token = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username);
        var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

        return new AuthenticationResult
        {
            User = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
                Avatar = user.Avatar
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

        return new AuthenticationResult
        {
            User = new UserViewModel
            {
                Id = tokenDetails.User.Id,
                Username = tokenDetails.User.Username,
                Avatar = tokenDetails.User.Avatar
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
        
        if (tokenDetails.UserId != userId)
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