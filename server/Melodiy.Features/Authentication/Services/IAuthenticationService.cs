namespace Melodiy.Features.Authentication.Services;

using Melodiy.Features.Authentication.Contracts.Models;
using Melodiy.Features.Authentication.Contracts.Requests;
using Melodiy.Features.User.Enums;

public interface IAuthenticationService
{
    /// <summary>
    /// Validates user login credentials and generates authentication tokens.
    /// <summary>
/// Validates the specified login credentials and produces an authentication result.
/// </summary>
/// <param name="request">The credentials and related login data to validate.</param>
/// <returns>An AuthenticationModel containing issued access/refresh tokens and authenticated user information.</returns>
    Task<AuthenticationModel> ValidateLogin(LoginRequest request);

    /// <summary>
    /// Registers a new user and generates authentication tokens.
    /// <summary>
/// Creates a new user account using the provided registration details and assigns the specified role.
/// </summary>
/// <param name="request">User registration data (e.g., username, password, and profile information).</param>
/// <param name="role">The role to assign to the newly created user.</param>
/// <returns>An AuthenticationModel containing issued access and refresh tokens for the newly created account.</returns>
    Task<AuthenticationModel> Register(RegisterRequest request, UserRole role);

    /// <summary>
    /// Refreshes the access token using a valid refresh token.
    /// <summary>
/// Issues a new AuthenticationModel by validating the provided refresh token.
/// </summary>
/// <param name="refreshToken">The refresh token to validate and exchange for new credentials.</param>
/// <returns>An AuthenticationModel containing refreshed access and refresh tokens.</returns>
    Task<AuthenticationModel> RefreshToken(string refreshToken);

    /// <summary>
    /// Removes a specific refresh token for a user (logout).
    /// <summary>
/// Invalidates the specified refresh token for the given user.
/// </summary>
/// <param name="refreshToken">The refresh token value to remove or invalidate.</param>
/// <param name="userId">The identifier of the user who owns the refresh token.</param>
    Task RemoveRefreshToken(string refreshToken, int userId);
}