namespace Melodiy.Features.Authentication.Repository;

using Melodiy.Features.Authentication.Entities;

public interface IRefreshTokenRepository
{
    Task<RefreshToken> AddAsync(RefreshToken token);

    Task DeleteAsync(int userId, DateTime expiryDate);

    Task DeleteAsync(RefreshToken token);

    Task<RefreshToken?> GetAsync(string token);

    Task<RefreshToken?> SaveAsync(RefreshToken token);

    IRefreshTokenRepository WithUser();
}
