namespace Melodiy.Features.User;

using System.Net;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    [Authorize]
    public async Task<UserViewModel> GetUser()
    {
        var user = await _userService.GetUserDetails();

        return user != null ? user.ToViewModel() : throw new ApiException(HttpStatusCode.Unauthorized, string.Empty);
    }

    [HttpPatch]
    [Authorize]
    public async Task<UserViewModel> UpdateUser([FromForm] UpdateUserRequest request)
    {
        var user = await _userService.UpdateUser(request);

        return user != null ? user.ToViewModel() : throw new ApiException(HttpStatusCode.Unauthorized, string.Empty);
    }

    //Might be used in the future possibly going to leave it commented as its likely we might need to fetch basic user data without returning the whole profile.
    //[HttpGet("{username}")]
    //public async Task<UserViewModel> GetUserById(string username)
    //{
    //    var user = await _userService.GetByName(username);

    //    return user != null ? user.ToViewModel() : throw new ApiException(HttpStatusCode.NotFound, $"Could not find a username {username}");
    //}
}