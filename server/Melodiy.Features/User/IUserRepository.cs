namespace Melodiy.Features.User;

using Melodiy.Features.User.Entities;

public interface IUserRepository
{
    IQueryable<User> AsQueryable();

    Task<User> AddAsync(string username, string password, Role role);

    Task<bool> ExistsAsync(string username);

    Task<User?> GetByIdAsync(int id);

    Task<User?> GetByUsername(string username);

    Task UpdateAsync(User user);
}
