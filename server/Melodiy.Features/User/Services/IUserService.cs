namespace Melodiy.Features.User.Services;

using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Enums;

public interface IUserService
{
    Task<UserEntity> CreateUser(string username, string password, UserRole role);
}
