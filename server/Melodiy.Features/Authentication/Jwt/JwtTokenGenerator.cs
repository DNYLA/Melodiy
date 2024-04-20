namespace Melodiy.Features.Authentication.Jwt;

using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common.Services;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

public sealed class JwtTokenGenerator(IDateTimeProvider dateTimeProvider, IOptions<AuthenticationSettings> jwtOptions)
    : IJwtTokenGenerator
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
            issuer: _authenticationSettings.Issuer,
            audience: _authenticationSettings.Audience,
            expires: dateTimeProvider.UtcNow.AddMinutes(_authenticationSettings.ExpiryMinutesJwt),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public RefreshTokenModel GenerateRefreshToken()
    {
        return new RefreshTokenModel
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = dateTimeProvider.UtcNow.AddDays(_authenticationSettings.ExpiryDaysRefresh)
        };
    }
}