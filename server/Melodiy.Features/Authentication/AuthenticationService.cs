namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Jwt;
using Melodiy.Features.Authentication.Models;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.User;
using Melodiy.Features.User.Models;
using Melodiy.Integrations.Common;

using System.Net;

public sealed class AuthenticationService(
    IJwtTokenGenerator jwtTokenGenerator,
    IHashService hashService,
    IUserRepository userRepository) : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator = jwtTokenGenerator;

    private readonly IHashService _hashService = hashService;

    private readonly IUserRepository _userRepository = userRepository;

    public async Task<AuthenticationResultViewModel> ValidateLogin(LoginRequestModel loginRequestModel)
    {
        var user = await _userRepository.GetByUsername(loginRequestModel.Username);

        if (user == null || !_hashService.ValidateSecure(loginRequestModel.Password, user.Password))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "Invalid Credentials");
        }

        var token = _jwtTokenGenerator.GenerateToken(user.Id, user.Username);

        return new AuthenticationResultViewModel()
        {
            User = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
            },
            AccessToken = token,
        };
    }

    public async Task<AuthenticationResultViewModel> Register(RegisterRequestModel registerRequestModel)
    {
        if (await _userRepository.ExistsAsync(registerRequestModel.Username))
        {
            throw new ApiException(HttpStatusCode.Conflict, "Username already exists");
        }

        var hashedPassword = _hashService.Secure(registerRequestModel.Password);
        var user = await _userRepository.AddAsync(registerRequestModel.Username, hashedPassword);
        var token = _jwtTokenGenerator.GenerateToken(user.Id, user.Username);

        return new AuthenticationResultViewModel()
        {
            User = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
            },
            AccessToken = token,
        };
    }
}