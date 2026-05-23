namespace Melodiy.Features.Authentication.Services;

using Melodiy.Features.Authentication.Contracts.Responses;
using Melodiy.Features.Authentication.Options;
using Melodiy.Features.Common.Extensions;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

public sealed class JwtTokenGenerator(TimeProvider timeProvider, IOptions<AuthenticationSettings> jwtOptions) : IJwtTokenGenerator
{
    private readonly AuthenticationSettings _authenticationSettings = jwtOptions.Value;

    /// <summary>
    /// Creates a signed JWT access token containing subject, name, and jti claims and an expiration.
    /// </summary>
    /// <param name="id">User identifier emitted as the token's `sub` claim.</param>
    /// <param name="username">User name emitted as the token's `name` claim.</param>
    /// <returns>The serialized JWT access token.</returns>
    public string GenerateAccessToken(int id, string username)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.Secret)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var securityToken = new JwtSecurityToken(
            issuer: AuthenticationSettings.Issuer,
            audience: AuthenticationSettings.Audience,
            expires: timeProvider.UtcNow().AddMinutes(AuthenticationSettings.ExpiryMinutesJwt).UtcDateTime,
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    /// <summary>
    /// Creates a new refresh token with a cryptographically secure random value and an expiration timestamp.
    /// </summary>
    /// <returns>
    /// A <see cref="RefreshTokenResponse"/> whose <c>Token</c> is the Base64-encoded representation of 64 cryptographically secure random bytes,
    /// and whose <c>Expires</c> is the UTC expiration time computed from the current time plus the configured refresh token lifetime.
    /// </returns>
    public RefreshTokenResponse GenerateRefreshToken()
    {
        return new RefreshTokenResponse
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = timeProvider.UtcNow().AddDays(AuthenticationSettings.ExpiryDaysRefresh)
        };
    }
}