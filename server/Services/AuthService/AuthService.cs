using Melodiy.Dtos.Auth;
using Melodiy.Services.HashService;
using Melodiy.Services.TokenService;
using Melodiy.Services.UserService;

namespace Melodiy.Services;

public class AuthService : IAuthService
{
    private readonly IHashService _hashService;
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;

    public AuthService(IHashService hashService, ITokenService tokenService, IUserService userService)
    {
        _tokenService = tokenService;
        _userService = userService;
        _hashService = hashService;
    }

    public async Task<AuthResponse?> Login(string username, string password)
    {
        var user = await _userService.GetFullUser(username);
        if (user == null || _hashService.VerifyPassword(password, user.Password))
        {
            return null;
        }

        var token = _tokenService.CreateToken(user.Id, user.Username);


        return new AuthResponse
        {
            Id = user.Id,
            Username = user.Username,
            AccessToken = token
        };
    }

    public async Task<AuthResponse> Register(string username, string password)
    {
        var existingUser = await _userService.GetFullUser(username);
        if (existingUser != null)
        {
            throw new Exception("Username Already exists 409");
        }

        var passwordHash = _hashService.HashPassword(password);
        var user = await _userService.CreateUser(username, passwordHash);
        var token = _tokenService.CreateToken(user.Id, user.Username);

        return new AuthResponse
        {
            Id = user.Id,
            Username = user.Username,
            AccessToken = token
        };
    }
}