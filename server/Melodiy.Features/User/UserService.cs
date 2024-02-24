namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

public sealed class UserService : IUserService
{
    public async Task<UserDetailsModel?> GetUserDetails()
    {
        throw new NotImplementedException();
    }

    public async Task<UserDetailsModel?> GetById(int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<UserDetailsModel?> GetByName(string username)
    {
        throw new NotImplementedException();
    }

    public async Task<UserDetailsModel?> Create(string username, string pHash)
    {
        throw new NotImplementedException();
    }
}
