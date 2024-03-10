namespace Melodiy.Features.Authentication.Jwt;

public interface IJwtTokenGenerator
{
    string GenerateToken(int id, string username);
}
