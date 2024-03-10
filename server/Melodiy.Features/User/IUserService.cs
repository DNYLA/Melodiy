namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

public interface IUserService
{
    Task<UserResponse?> GetUserDetails();

    Task<UserResponse?> GetById(int userId);

    Task<UserResponse?> GetByName(string username);

    //Task<UserResponseModel> Update(User user);
}
