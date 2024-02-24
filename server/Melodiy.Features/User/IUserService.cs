namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

public interface IUserService
{
    Task<UserDetailsModel?> GetUserDetails();

    Task<UserDetailsModel?> GetById(int userId);

    Task<UserDetailsModel?> GetByName(string username);

    Task<UserDetailsModel?> Create(string username, string pHash);

    //Task<UserResponseModel> Update(User user);
}
