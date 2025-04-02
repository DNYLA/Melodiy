namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Models;

public interface IAuthenticationService
{
    Task<AuthenticationInfoResponse> CreateSrpSession(string username);

    Task<AuthenticationResult> ValidateAuth(AuthenticationRequestModel request);

    Task<AuthenticationResult> Register(RegisterRequestModel request, Role role);

    Task CreateKey(CreateKeyRequestModel request, UserResponse user);

    Task<List<UserKeyModel>> GetKeys(int userId);

    Task<AuthenticationResult> RefreshToken(string refreshToken);

    Task RemoveRefreshToken(string refreshToken, int userId);
}
