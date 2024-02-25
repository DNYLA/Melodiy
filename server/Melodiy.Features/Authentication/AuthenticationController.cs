namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;

using Microsoft.AspNetCore.Mvc;

[ApiController]                     
[Route("auth")]
public sealed class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
{
    private readonly IAuthenticationService _authenticationService = authenticationService;

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestModel loginRequestModel)
    {
        var response = await _authenticationService.ValidateLogin(loginRequestModel);

        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestModel registerRequestModel)
    {
        var response = await _authenticationService.Register(registerRequestModel);

        return Ok(response);
    }
}