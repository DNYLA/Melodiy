using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using melodiy.server.Data.Auth;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.UserService;

namespace melodiy.server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
		private readonly IAuthRepository _authRepo;
    	private readonly IAuthService _authService;
    	private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
		public AuthController(IAuthRepository authRepo, IAuthService authService, IUserService userService, IConfiguration configuratio) 
		{
            _configuration = configuratio;
      		_userService = userService;
      		_authService = authService;
      		_authRepo = authRepo;
		}

		[HttpPost("Register")]
		public async Task<ActionResult<ServiceResponse<int>>> Register(CreateUserRequest request)
		{
			var response = await _authRepo.Register(new User{Username = request.Username}, request.Password);

			if (!response.Success)
				return Conflict(response);
			
			return Ok(response);
		}

		[HttpPost("Login")]
		public async Task<ActionResult<ServiceResponse<GetAuthResponse>>> Login(UserLoginRequest request)
		{
			var response = await _authRepo.Login(request.Username, request.Password);

			if (!response.Success)
				return Unauthorized(response);
			
			return Ok(response);
		}

		[Authorize]
		[HttpGet("Me")]
		public async Task<ActionResult<ServiceResponse<GetUserResponse>>> GetUser()
		{
			var userId = _authService.GetUserId();

			return Ok(await _userService.GetUserById(userId));
		}

        [Authorize]
		[HttpGet("secret")]
		public async Task<ActionResult<ServiceResponse<List<GetSecret>>>> GetTest()
		{
			var userId = _authService.GetUserId();


            var key = _configuration.GetSection("AppSettings:SupabaseKey").Value;
			var url = _configuration.GetSection("AppSettings:SupabaseURL").Value;
            var token = _configuration.GetSection("AppSettings:Token").Value;

            var key2 = _configuration.GetSection("AppSettings:APPSETTING_SupabaseKey").Value;
			var url2 = _configuration.GetSection("AppSettings:APPSETTING_SupabaseURL").Value;
            var token2 = _configuration.GetSection("APPSETTING_AppSettings:Token").Value;
            
            List<GetSecret> x = new()
            {
                new GetSecret()
                {
                    Key = key, Url = url, Token = token
                },
                new GetSecret()
                {
                    Key = key2, Url = url2, Token = token2
                },
            };

            return Ok(x);
		}
	}
}

public class GetSecret
{
    public string? Key { get; set; } = string.Empty;
    public string? Url { get; set; } = string.Empty;
    public string? Token { get; set; } = string.Empty;
}