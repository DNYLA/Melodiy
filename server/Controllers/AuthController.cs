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


    [HttpGet()]
    public async Task<ActionResult<bool>> Get()
    {
        return true;
    }
}