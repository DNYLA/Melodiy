namespace Melodiy.Features.Authentication.Jwt;

using Melodiy.Features.Authentication.Models;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(int id, string username);

    RefreshTokenModel GenerateRefreshToken();
}