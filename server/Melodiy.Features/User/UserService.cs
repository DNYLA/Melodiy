namespace Melodiy.Features.User;

using Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Http;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public sealed class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    //private readonly IUserRepository _userRepository;

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        //_userRepository = userRepository;
    }

    public async Task<UserResponse?> GetUserDetails()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var model = new UserResponse();

        if (user == null || user?.Identity?.IsAuthenticated == false)
        {
            return model;
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
        throw new NotImplementedException();
    }
}