namespace Melodiy.Features.Authentication.Repository;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Context;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class AuthenticationRepository(MelodiyDbContext context) : IAuthenticationRepository
{
    private readonly DbSet<User> _users = context.Set<User>();

    public async Task<User?> GetByUsername(string username)
    {
        return await _users.Include(x => x.AuthenticationDetails).FirstOrDefaultAsync(x => x.Username.ToLower() == username.ToLower());
    }
}
