namespace Melodiy.Features.User;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}
