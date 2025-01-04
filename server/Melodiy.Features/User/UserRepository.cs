namespace Melodiy.Features.User;

using Melodiy.Features.Common.Context;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class UserRepository(MelodiyDbContext context) : IUserRepository
{
    private readonly DbSet<User> _users = context.Set<User>();

    public IQueryable<User> AsQueryable()
    {
        return _users.AsQueryable();
    }

    public async Task<User> AddAsync(string username, string password, Role role)
    {
        var user = new User
        {
            Username = username,
            Password = password,
            Role = role
        };

        _users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }

    public async Task<bool> ExistsAsync(string username)
    {
        return await _users.AnyAsync(user => user.Username.ToLower().Equals(username.ToLower()));
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _users.FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<User?> GetByUsername(string username)
    {
        return await _users.FirstOrDefaultAsync(user => user.Username.ToLower().Equals(username.ToLower()));
    }

    public async Task SaveAsync(User user)
    {
        _users.Update(user);
        await context.SaveChangesAsync();
    }
}