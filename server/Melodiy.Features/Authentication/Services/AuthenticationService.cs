namespace Melodiy.Features.Authentication.Services;

using BCrypt.Net;

using Melodiy.Features.Authentication.Contracts.Models;
using Melodiy.Features.Authentication.Contracts.Requests;
using Melodiy.Features.Authentication.Contracts.Responses;
using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Data;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.User.Enums;
using Melodiy.Features.User.Mappers;
using Melodiy.Features.User.Services;

using Microsoft.EntityFrameworkCore;

using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;

public sealed class AuthenticationService(
    MelodiyDbContext dbContext,
    IUserService userService,
    IJwtTokenGenerator jwtTokenGenerator) : IAuthenticationService
{
    public async Task<AuthenticationModel> ValidateLogin(LoginRequest request, string? userAgent)
    {
        var user = await dbContext.Users
            .Include(u => u.AuthenticationDetails)
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !BCrypt.Verify(request.Password, user.AuthenticationDetails.PasswordHash))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid username or password");
        }

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username!);
        var refreshToken = await CreateRefreshToken(user.Id, userAgent);

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(user),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthenticationModel> Register(RegisterRequest request, string? userAgent)
    {
        if (await dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.Username) != null)
        {
            throw new ApiException(HttpStatusCode.Conflict, "Username already exists");
        }

        // Create user
        var user = await userService.CreateUser(request.Username, request.Password, UserRole.Default);

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username!);
        var refreshToken = await CreateRefreshToken(user.Id, userAgent);

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(user),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthenticationModel> RefreshToken(string refreshToken)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Refresh token is required");
        }

        var token = await dbContext.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == ComputeRefreshTokenHash(refreshToken));
        if (token == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid refresh token");
        }

        if (token.Expires < DateTime.UtcNow)
        {
            // Remove expired token
            dbContext.RefreshTokens.Remove(token);
            await dbContext.SaveChangesAsync();
            throw new ApiException(HttpStatusCode.Unauthorized, "Refresh token has expired");
        }

        await using var transaction = await dbContext.Database.BeginTransactionAsync();
        var affected = await dbContext.RefreshTokens
                                      .Where(rt => rt.Id == token.Id)
                                      .ExecuteDeleteAsync();

        if (affected == 0)
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid refresh token");
        }

        var accessToken = jwtTokenGenerator.GenerateAccessToken(token.User.Id, token.User.Username);
        var newRefreshToken = await CreateRefreshToken(token.User.Id, token.UserAgent);

        await dbContext.SaveChangesAsync();

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(token.User),
            AccessToken = accessToken,
            RefreshToken = newRefreshToken
        };
    }

    public async Task RemoveRefreshToken(string refreshToken, int userId)
    {
        var tokenDetails = await dbContext.RefreshTokens
                                          .Include(x => x.User)
                                          .FirstOrDefaultAsync(x => x.Token == ComputeRefreshTokenHash(refreshToken));
        if (tokenDetails == null || tokenDetails.UserId != userId)
        {
            return;
        }

        dbContext.RefreshTokens.Remove(tokenDetails);
        await dbContext.SaveChangesAsync();
    }

    private static string ComputeRefreshTokenHash(string token)
    {
        var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(hashBytes).ToLowerInvariant();
    }

    private async Task<RefreshTokenResponse> CreateRefreshToken(int userId, string? userAgent)
    {
        //TODO: Should we verify previously created refresh tokens and prune any old ones?
        var tokenDetails = jwtTokenGenerator.GenerateRefreshToken();

        await dbContext.RefreshTokens.AddAsync(new RefreshToken
        {
            Token = ComputeRefreshTokenHash(tokenDetails.Token),
            Expires = tokenDetails.Expires,
            UserId = userId,
            UserAgent = userAgent
        });
        await dbContext.SaveChangesAsync();

        return new RefreshTokenResponse
        {
            Token = tokenDetails.Token,
            Expires = tokenDetails.Expires
        };
    }
}