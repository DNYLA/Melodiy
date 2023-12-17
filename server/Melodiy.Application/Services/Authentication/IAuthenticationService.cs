namespace Melodiy.Application.Services.Authentication;

public interface IAuthenticationService
{
    Task<AuthenticationResult> Login(string username, string password);
    Task<AuthenticationResult> Register(string username, string password);
}