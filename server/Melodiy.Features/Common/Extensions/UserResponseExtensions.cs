namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.User.Models;

public static class UserResponseExtensions
{
    public static UserViewModel ToViewModel(this UserResponse? user)
    {
        if (user == null)
        {
            return new UserViewModel();
        }

        return new UserViewModel
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}
