namespace Melodiy.Features.Authentication.Repository;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.User.Entities;

public interface IAuthenticationRepository
{
    Task<User?> GetByUsername(string username);
}
