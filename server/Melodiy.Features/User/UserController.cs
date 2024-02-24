namespace Melodiy.Features.User;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        return Ok("Valid");
    }
}
