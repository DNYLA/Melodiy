using System.Net;
using System.Security.Claims;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace Melodiy.Api.Controllers;


[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetUser()
    {


        var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value;
        var user = await _userService.GetById(int.Parse(userId)) ?? throw new ApiError(HttpStatusCode.Unauthorized, "User not found");

        var response = user.Adapt<Contracts.User.UserResponse>();

        return Ok(response);
    }
}