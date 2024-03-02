namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("auth")]
public sealed class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
{
    private readonly IAuthenticationService _authenticationService = authenticationService;

    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Login(LoginRequestModel loginRequestModel)
    {
        return await _authenticationService.ValidateLogin(loginRequestModel);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthenticationResultViewModel>> Register(RegisterRequestModel registerRequestModel)
    {
        return await _authenticationService.Register(registerRequestModel);
    }
}