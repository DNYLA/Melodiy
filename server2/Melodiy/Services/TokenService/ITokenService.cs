namespace Melodiy.Services.TokenService;

public interface ITokenService
{
    string CreateToken(int userId, string username);
}