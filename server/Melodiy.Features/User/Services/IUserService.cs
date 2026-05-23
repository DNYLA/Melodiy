namespace Melodiy.Features.User.Services;

using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Enums;

public interface IUserService
{
    /// <summary>
/// Creates a new user with the specified username, password, and role.
/// </summary>
/// <param name="username">The desired username for the new user.</param>
/// <param name="password">The password for the new user.</param>
/// <param name="role">The role to assign to the new user.</param>
/// <returns>The created <see cref="UserEntity"/>.</returns>
Task<UserEntity> CreateUser(string username, string password, UserRole role);
}
