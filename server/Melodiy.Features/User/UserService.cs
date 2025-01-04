using Melodiy.Features.File;

namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Http;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public sealed class UserService(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IFileService fileService) : IUserService
{
    public async Task<UserResponse?> GetUserDetails()
    {
        var user = httpContextAccessor.HttpContext?.User;
        var model = new UserResponse();

        if (user == null || user.Identity?.IsAuthenticated == false)
        {
            return null;
        }

        var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
        var username = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value!;

        //TODO: Fetch user from DB Cache and return cached data.
        model.Id = int.Parse(userId);
        model.Username = username;

        return model;
    }

    public async Task<UserResponse?> GetById(int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<UserResponse?> GetByName(string username)
    {
        var user = await userRepository.GetByUsername(username);

        if (user == null) return null;

        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }

    public async Task<UserResponse?> UpdateUser(UpdateUserRequest request)
    {
        var userFromSession = await GetUserDetails();
        if (userFromSession == null) return null;

        var user = await userRepository.GetByIdAsync(userFromSession.Id);
        if (user == null) return null;

        if (request is { UpdateImage: true, Image: null })
        {
            user.Avatar = null;
        } else if (request is { UpdateImage: true, Image: not null })
        {
            //TODO: Call Image service
            var image = await fileService.UploadImage(request.Image);
            user.Avatar = image.Url;
        }

        await userRepository.SaveAsync(user);

        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}