namespace Melodiy.Features.User;

using Melodiy.Features.Common.Exceptions;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUser()
    {
        var user = await _userService.GetUserDetails();

        return user == null ? throw new ApiException(HttpStatusCode.Unauthorized, string.Empty) : Ok(user);
    }
}