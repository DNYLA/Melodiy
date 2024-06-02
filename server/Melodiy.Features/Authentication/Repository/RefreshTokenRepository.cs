namespace Melodiy.Features.Authentication.Repository;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Context;
using Microsoft.EntityFrameworkCore;

public sealed class RefreshTokenRepository(MelodiyDbContext context) : IRefreshTokenRepository
{
    private readonly DbSet<RefreshToken> _refreshTokens = context.Set<RefreshToken>();

    public async Task<RefreshToken> AddAsync(RefreshToken token)
    {
        _refreshTokens.Add(token);
        await context.SaveChangesAsync();

        return token;
    }

    public async Task DeleteExpiredAsync(int userId, DateTime expiryDate)
    {
        var expired = await _refreshTokens.Where(x => x.UserId == userId && x.Expires < expiryDate).ToListAsync();
        _refreshTokens.RemoveRange(expired);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(RefreshToken token)
    {
        _refreshTokens.Remove(token);
        await context.SaveChangesAsync();
    }

    public async Task<RefreshToken?> GetAsync(string token)
    {
        return await _refreshTokens.FirstOrDefaultAsync(x => x.Token == token);
    }

    public async Task<RefreshToken?> SaveAsync(RefreshToken token)
    {
        await context.SaveChangesAsync();

        return token;
    }

    public IRefreshTokenRepository WithUser()
    {
        _refreshTokens.Include(x => x.User).Load();

        return this;
    }
}
