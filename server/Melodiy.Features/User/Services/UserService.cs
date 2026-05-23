namespace Melodiy.Features.User.Services;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Data;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Enums;

public sealed class UserService(MelodiyDbContext dbContext) : IUserService
{
    /// <summary>
    /// Creates a new user with the specified username, password hash, and role, persists it to the database, and returns the created entity.
    /// </summary>
    /// <param name="username">The user's username.</param>
    /// <param name="passwordHash">The hashed password to store in the user's authentication details.</param>
    /// <param name="role">The role assigned to the user.</param>
    /// <returns>The persisted <see cref="UserEntity"/> representing the newly created user.</returns>
    public async Task<UserEntity> CreateUser(string username, string passwordHash, UserRole role)
    {
        var user = new UserEntity
        {
            Username = username,
            Role = role,
            AuthenticationDetails = new AuthenticationDetails
            {
                PasswordHash = passwordHash
            }
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        return user;
    }

}
