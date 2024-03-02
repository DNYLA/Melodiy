namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;

public interface IAuthenticationService
{
    Task<AuthenticationResultViewModel> ValidateLogin(LoginRequestModel loginRequestModel);

    Task<AuthenticationResultViewModel> Register(RegisterRequestModel registerRequestModel);
}
