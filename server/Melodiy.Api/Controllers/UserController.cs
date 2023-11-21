using System.Net;
using System.Security.Claims;
using Melodiy.Api.Attributes;
using Melodiy.Api.Models;
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
    public async Task<IActionResult> GetUser([FromClaims] UserClaims claims)
    {

        var user = await _userService.GetById(claims.Id);

        var response = user.Adapt<Contracts.User.UserResponse>();

        return Ok(response);
    }
}