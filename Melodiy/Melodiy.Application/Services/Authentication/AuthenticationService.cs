using Melodiy.Application.Common.Interfaces.Authentication;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public AuthenticationResult Login(string username, string password)
    {
        return new AuthenticationResult()
        {
            Id = 15,
            Username = username,
            AccessToken = username + password,
        };
    }

    public AuthenticationResult Register(string username, string password)
    {
        //Check if user alreadt exists

        //Create user
        var userId = 15;

        //Create JWT Token
        var token = _jwtTokenGenerator.GenerateToken(userId, username);

        return new AuthenticationResult()
        {
            Id = userId,
            Username = username,
            AccessToken = token,
        };
    }
}