using Melodiy.Application.Services.Authentication;
using Melodiy.Contracts.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authService;
    public AuthenticationController(IAuthenticationService authService)
    {
      _authService = authService;
        
    }
    [HttpPost("Login")]
    public IActionResult Login(LoginRequest request)
    {
        var authResult = _authService.Login(request.Username, request.Password);
        
        var response = new AuthenticationResponse()
        {
            Id = authResult.Id,
            Username = authResult.Username,
            AccessToken = authResult.AccessToken
        };

        return Ok(response);
    }

    [HttpPost("Register")]
    public IActionResult Register(RegisterRequest request)
    {
        var authResult = _authService.Register(request.Username, request.Password);
        
        var response = new AuthenticationResponse()
        {
            Id = authResult.Id,
            Username = authResult.Username,
            AccessToken = authResult.AccessToken
        };

        return Ok(response);
    }
}