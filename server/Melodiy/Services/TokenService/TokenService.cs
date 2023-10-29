using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
namespace Melodiy.Services.TokenService;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(int userId, string username)
    {
        string secret = _configuration.GetSection("AppSettings:JWTSecret").Value ?? throw new Exception("AppSettings Token is null!");
        SymmetricSecurityKey key = new(System.Text.Encoding.UTF8.GetBytes(secret));

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.NameIdentifier, userId.ToString()),
                new(ClaimTypes.Name, username),
            }),
            IssuedAt = DateTime.UtcNow,
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = new(key, SecurityAlgorithms.HmacSha512Signature),
        };

        JwtSecurityTokenHandler tokenHandler = new();
        var token = tokenHandler.CreateToken(tokenDescriptor);


        return tokenHandler.WriteToken(token);
    }
}