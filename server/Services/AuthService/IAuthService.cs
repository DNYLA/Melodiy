using Melodiy.Dtos.Auth;

namespace Melodiy.Services;

public interface IAuthService
{
    Task<AuthResponse?> Login(string username, string password);
    Task<AuthResponse> Register(string username, string password);
}