using System.Net;
using Melodiy.Contracts.Auth;
using Melodiy.Services;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }


    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Login(UserLoginRequest request)
    {
        var response = await _authService.Login(request.Username, request.Password) ?? throw new APIException(HttpStatusCode.NotFound, "Invalid credentials!");
        return response;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterUserRequest request)
    {
        var response = await _authService.Register(request.Username, request.Password);

        return response;
    }
}