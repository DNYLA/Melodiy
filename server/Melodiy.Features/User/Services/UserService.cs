namespace Melodiy.Features.User.Services;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Data;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Enums;

public sealed class UserService(MelodiyDbContext dbContext) : IUserService
{
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
