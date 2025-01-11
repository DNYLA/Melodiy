namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;
using Melodiy.Features.User.Entities;

public interface IAuthenticationService
{
    Task<AuthenticationInfoResponse> CreateSrpSession(string username);

    Task<AuthenticationResult> ValidateAuth(AuthenticationRequestModel request);

    Task<AuthenticationResult> Register(RegisterRequestModel request, Role role);

    Task<AuthenticationResult> RefreshToken(string refreshToken);

    Task RemoveRefreshToken(string refreshToken, int userId);
}
