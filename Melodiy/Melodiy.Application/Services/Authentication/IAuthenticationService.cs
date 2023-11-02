namespace Melodiy.Application.Services.Authentication;

public interface IAuthenticationService
{
    AuthenticationResult Login(string username, string password);
    AuthenticationResult Register(string username, string password);
}