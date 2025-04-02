using Melodiy.Features.Authentication.Entities;

namespace Melodiy.Features.Authentication.Repository;

public interface IUserKeyRepository
{
    Task<UserKey> Create(int userId, string publicKey, string privateKey, string salt);

    Task<List<UserKey>> GetByUser(int userId);
}
