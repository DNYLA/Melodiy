namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

public interface IUserService
{
    Task<UserDetailsModel?> GetUserDetails();

    Task<UserResponseModel?> GetById(int userId);

    Task<UserResponseModel?> GetByName(string username);

    Task<UserResponseModel?> Create(string username, string pHash);

    //Task<UserResponseModel> Update(User user);
}
