using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;


[ApiController]
[Route("controller")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUser()
    {
        return Ok(Array.Empty<string>());
    }
}