
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.UserService;

public interface IUserService
{
    Task<UserResponse?> GetById(int userId);
    Task<UserResponse?> GetByName(string username);
    Task<User?> Create(string username, string pHash);
    Task<User> Update(User user);
}