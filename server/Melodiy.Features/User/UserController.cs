namespace Melodiy.Features.User;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

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
}