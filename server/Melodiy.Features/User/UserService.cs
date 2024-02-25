namespace Melodiy.Features.User;

using System.IdentityModel.Tokens.Jwt;

using Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Http;

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

    public async Task<UserDetailsModel?> GetUserDetails()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var model = new UserDetailsModel();

        if (user?.Identity?.IsAuthenticated == false)
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

    public async Task<UserDetailsModel?> GetById(int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<UserDetailsModel?> GetByName(string username)
    {
        throw new NotImplementedException();
    }
}