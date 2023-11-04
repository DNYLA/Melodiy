
using Melodiy.Domain.Entities; 

namespace Melodiy.Application.Services.UserService;

public interface IUserService
{
    Task<User?> GetById(int userId);
    Task<User?> GetByName(string username);
    Task<User> Create(User user);
    Task<User> Update(User user);
}