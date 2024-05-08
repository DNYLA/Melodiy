namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;

public interface IAuthenticationService
{
    Task<AuthenticationResult> ValidateLogin(LoginRequestModel request);

    Task<AuthenticationResult> Register(RegisterRequestModel request);

    Task<AuthenticationResult> RefreshToken(string refreshToken);

    Task RemoveRefreshToken(string refreshToken, int userId);
}
