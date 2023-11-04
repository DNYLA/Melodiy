using Melodiy.Application.Common.Interfaces.Authentication;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserService _userService;
    public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserService userService)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userService = userService;
    }

    public async Task<AuthenticationResult> Login(string username, string password)
    {
        //User Exists
        var user = await _userService.GetByName(username) ?? throw new Exception("Invalid Credentials!");

        //Validate Password
        if (user.Password != password)
        {
            throw new Exception("Invalid Credentials");
        }

        //Generate Token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult()
        {
            User = user,
            AccessToken = token,
        };
    }

    public async Task<AuthenticationResult> Register(string username, string password)
    {
        //Check if user already exists
        if (_userService.GetByName(username) is not null)
        {
            throw new Exception("Username already exists");
        }

        //Create user
        var user = new User()
        {
            Username = username,
            Password = password
        };
        var user2 = await _userService.Create(user);

        Console.WriteLine(user2.Id);
        Console.WriteLine(user.Id);

        //Create JWT Token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult()
        {
            User = user,
            AccessToken = token,
        };
    }
}