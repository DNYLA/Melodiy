using melodiy.server.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace melodiy.server.Controllers
{
	// [Authorize]
	[ApiController]
	[Route("api/[controller]")]
    public class UserController : ControllerBase 
    {
    	private readonly IUserService _userService;
		public UserController(IUserService userService, IMapper iMapper)
		{
      		_userService = userService;
		}

        [HttpGet("{id}")]
		// public async Task<ActionResult<ServiceResponse<List<GetCharacterResponse>>>> Get()
		public async Task<ActionResult<ServiceResponse<GetUserResponse>>> GetUser(int id)
		{

			return Ok(await _userService.GetUserById(id));
		}
	
    }
}