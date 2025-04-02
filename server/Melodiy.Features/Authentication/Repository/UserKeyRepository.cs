using Melodiy.Features.Authentication.Entities;

namespace Melodiy.Features.Authentication.Repository;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Common.Context;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

using System.Reflection.Metadata;

public class UserKeyRepository(MelodiyDbContext context) : IUserKeyRepository
{
    private readonly DbSet<UserKey> _keys = context.Set<UserKey>();

    public async Task<UserKey> Create(int userId, string publicKey, string privateKey, string salt)
    {

        var key = new UserKey
        {
            UserId = userId,
            PublicKey = publicKey,
            PrivateKey = privateKey,
            Salt = salt
        };

        _keys.Add(key);
        await context.SaveChangesAsync();

        return key;
    }

    public async Task<List<UserKey>> GetByUser(int userId)
    {
        return await _keys.Where(key => key.UserId == userId).ToListAsync();
    }
}
