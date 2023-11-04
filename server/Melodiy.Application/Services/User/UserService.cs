using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.UserService;

public class UserService : IUserService
{
    private readonly IDataContext _context;

    public UserService(IDataContext context)
    {
        _context = context;
    }

    public async Task<User?> Create(string username, string pHash)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        if (user is not null) 
        {
            return null;
        }
        
        User newUser = new()
        {
            Username = username,
            Password = pHash
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    public Task<User?> GetById(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetByName(string username)
    {
        throw new NotImplementedException();
    }

    public Task<User> Update(User user)
    {
        throw new NotImplementedException();
    }
}