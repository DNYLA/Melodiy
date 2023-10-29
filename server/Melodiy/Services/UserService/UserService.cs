
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Services.UserService;

public class UserService : IUserService
{
    private readonly DataContext _context;

    public UserService(DataContext context)
    {
        _context = context;
    }

    public async Task<User?> GetById(int userId)
    {
        var user = await _context.Users.FindAsync(userId);

        //TODO: Map Return

        return user;
    }

    public async Task<User?> GetFullUser(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        return user;
    }

    public async Task<User> CreateUser(string username, string pHash)
    {
        User newUser = new()
        {
            Username = username,
            Password = pHash
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    public Task<User> Update(User user)
    {
        throw new NotImplementedException();
    }
}