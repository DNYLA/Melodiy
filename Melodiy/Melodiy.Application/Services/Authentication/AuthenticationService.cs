using Melodiy.Application.Common.Interfaces.Authentication;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }

    public AuthenticationResult Login(string username, string password)
    {
        //User Exists
        var user = _userRepository.GetByName(username) ?? throw new Exception("Invalid Credentials!");

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

    public AuthenticationResult Register(string username, string password)
    {
        //Check if user already exists
        if (_userRepository.GetByName(username) is not null)
        {
            throw new Exception("Username already exists");
        }

        //Create user
        var user = new User()
        {
            Username = username,
            Password = password
        };
        _userRepository.Add(user);

        //Create JWT Token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult()
        {
            User = user,
            AccessToken = token,
        };
    }
}