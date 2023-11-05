using System.Net;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Authentication;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserService _userService;
    private readonly IHashService _hashService;
    private readonly IDataContext _context;
    public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserService userService, IHashService hashService, IDataContext context)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userService = userService;
        _hashService = hashService;
        _context = context;
    }

    public async Task<AuthenticationResult> Login(string username, string password)
    {
        //Check if user exists
        //Dont use UserService as that doesn't expose password
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        //Validate Password
        if (user == null || !_hashService.VerifyPassword(password, user.Password))
        {
            throw new ApiError(HttpStatusCode.Unauthorized, "Invalid Credentials");
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
        //Dont use UserService as that doesn't expose password
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        if (user != null)
        {
            throw new ApiError(HttpStatusCode.Conflict, "Username already exists");
        }

        //TODO: Hash Password
        var pHash = _hashService.HashPassword(password);

        //Create User
        var createdUser = await _userService.Create(username, pHash);

        //Create JWT Token
        var token = _jwtTokenGenerator.GenerateToken(createdUser!);

        return new AuthenticationResult()
        {
            User = createdUser!,
            AccessToken = token,
        };
    }
}