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

    public RefreshTokenResponse GenerateRefreshToken()
    {
        return new RefreshTokenResponse
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = timeProvider.UtcNow().AddDays(AuthenticationSettings.ExpiryDaysRefresh)
        };
    }
}