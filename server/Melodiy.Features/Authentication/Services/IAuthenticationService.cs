namespace Melodiy.Features.Authentication.Services;

using Melodiy.Features.Authentication.Contracts.Models;
using Melodiy.Features.Authentication.Contracts.Requests;
using Melodiy.Features.User.Enums;

public interface IAuthenticationService
{
    /// <summary>
    /// Validates user login credentials and generates authentication tokens.
    /// </summary>
    Task<AuthenticationModel> ValidateLogin(LoginRequest request);

    /// <summary>
    /// Registers a new user and generates authentication tokens.
    /// </summary>
    Task<AuthenticationModel> Register(RegisterRequest request, UserRole role);

    /// <summary>
    /// Refreshes the access token using a valid refresh token.
    /// </summary>
    Task<AuthenticationModel> RefreshToken(string refreshToken);

    /// <summary>
    /// Removes a specific refresh token for a user (logout).
    /// </summary>
    Task RemoveRefreshToken(string refreshToken, int userId);
}