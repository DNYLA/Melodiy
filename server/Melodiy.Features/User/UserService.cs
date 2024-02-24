namespace Melodiy.Features.User;

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


        if (!user?.Identity?.IsAuthenticated == false)
        {
            return model;
        }

        var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
        //var username = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value!;

        model.Id = int.Parse(userId);
        model.Username = "Bobster";

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

    public async Task<UserDetailsModel?> Create(string username, string pHash)
    {
        throw new NotImplementedException();
    }
}
