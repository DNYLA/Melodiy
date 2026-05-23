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

public sealed class AuthenticationService(
    MelodiyDbContext dbContext,
    IUserService userService,
    IJwtTokenGenerator jwtTokenGenerator) : IAuthenticationService
{
    /// <summary>
    /// Validates user credentials and issues authentication tokens.
    /// </summary>
    /// <param name="request">Login request containing the username, password, and optional user-agent used for the refresh token.</param>
    /// <returns>An AuthenticationModel containing the authenticated user's data, an access token, and a refresh token.</returns>
    /// <exception cref="ApiException">Thrown with <see cref="HttpStatusCode.Unauthorized"/> when the username or password is invalid.</exception>
    public async Task<AuthenticationModel> ValidateLogin(LoginRequest request)
    {
        var user = await dbContext.Users
            .Include(u => u.AuthenticationDetails)
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !BCrypt.Verify(request.Password, user.AuthenticationDetails!.PasswordHash))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid username or password");
        }

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username!);
        var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(user),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    /// <summary>
    /// Registers a new user with the specified role, persists their credentials, and returns authentication tokens.
    /// </summary>
    /// <param name="request">Registration details including username, password, and optional user agent for the refresh token.</param>
    /// <param name="role">Role to assign to the newly created user.</param>
    /// <returns>An AuthenticationModel containing the created user's public data, an access token, and a refresh token.</returns>
    /// <exception cref="ApiException">Thrown with HTTP 409 Conflict when the requested username is already in use.</exception>
    public async Task<AuthenticationModel> Register(RegisterRequest request, UserRole role)
    {
        if (await dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.Username) != null)
        {
            throw new ApiException(HttpStatusCode.Conflict, "Username already exists");
        }

        // Hash password using BCrypt
        var passwordHash = BCrypt.HashPassword(request.Password);

        // Create user
        var user = await userService.CreateUser(request.Username, passwordHash, role);

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user.Id, user.Username!);
        var refreshToken = await CreateRefreshToken(user.Id, request.UserAgent);

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(user),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    /// <summary>
    /// Exchanges a valid refresh token for a new access token and a newly issued refresh token.
    /// </summary>
    /// <param name="refreshToken">The refresh token string to validate and rotate.</param>
    /// <returns>An AuthenticationModel containing the mapped user, a new access token, and the newly issued refresh token.</returns>
    /// <exception cref="ApiException">Thrown with HttpStatusCode.Unauthorized when the refresh token is missing, invalid, or expired.</exception>
    public async Task<AuthenticationModel> RefreshToken(string refreshToken)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Refresh token is required");
        }

        var token = await dbContext.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

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

        var accessToken = jwtTokenGenerator.GenerateAccessToken(token.User!.Id, token.User.Username!);
        var newRefreshToken = await CreateRefreshToken(token.User.Id, token.UserAgent);

        // Remove old refresh token
        dbContext.RefreshTokens.Remove(token);
        await dbContext.SaveChangesAsync();

        return new AuthenticationModel
        {
            User = UserMapper.ToUserResponse(token.User),
            AccessToken = accessToken,
            RefreshToken = newRefreshToken
        };
    }

    /// <summary>
    /// Deletes the specified refresh token if it exists and is owned by the given user.
    /// </summary>
    /// <param name="refreshToken">The refresh token string to remove.</param>
    /// <param name="userId">The identifier of the user who must own the token.</param>
    public async Task RemoveRefreshToken(string refreshToken, int userId)
    {
        var tokenDetails = await dbContext.RefreshTokens.Include(x => x.User).FirstOrDefaultAsync(x => x.Token == refreshToken);
        if (tokenDetails == null || tokenDetails.UserId != userId)
        {
            return;
        }

        dbContext.RefreshTokens.Remove(tokenDetails);
        await dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Creates and persists a refresh token associated with the specified user and returns its details.
    /// </summary>
    /// <param name="userId">The identifier of the user the refresh token will be associated with.</param>
    /// <param name="userAgent">An optional user-agent string to record with the refresh token.</param>
    /// <returns>A <see cref="RefreshTokenResponse"/> containing the refresh token value and its expiration.</returns>
    private async Task<RefreshTokenResponse> CreateRefreshToken(int userId, string? userAgent)
    {
        //TODO: Should we verify previously created refresh tokens and prune any old ones?
        var tokenDetails = jwtTokenGenerator.GenerateRefreshToken();

        await dbContext.RefreshTokens.AddAsync(new RefreshToken
        {
            Token = tokenDetails.Token,
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