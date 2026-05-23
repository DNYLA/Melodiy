namespace Melodiy.Features.Authentication.Services;

using Melodiy.Features.Authentication.Contracts.Responses;

public interface IJwtTokenGenerator
{
    /// <summary>
/// Generates a JWT access token that represents the specified user.
/// </summary>
/// <param name="id">The user's numeric identifier included in the token claims.</param>
/// <param name="username">The user's username included in the token claims.</param>
/// <returns>The JWT access token as an encoded string.</returns>
string GenerateAccessToken(int id, string username);

    /// <summary>
/// Creates a new refresh token payload containing the token value and its expiry metadata.
/// </summary>
/// <returns>A <see cref="RefreshTokenResponse"/> containing the refresh token value and its expiration information.</returns>
RefreshTokenResponse GenerateRefreshToken();
}