namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Models;

public static class UserExtensions
{
    public static UserResponse ConvertToResponse(this User? user)
    {
        if (user == null)
        {
            return new UserResponse();
        }

        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}