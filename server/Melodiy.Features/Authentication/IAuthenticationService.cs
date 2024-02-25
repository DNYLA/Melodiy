namespace Melodiy.Features.Authentication;

using Melodiy.Features.Authentication.Models;

public interface IAuthenticationService
{
    Task<AuthenticationResponseModel> ValidateLogin(LoginRequestModel loginRequestModel);

    Task<AuthenticationResponseModel> Register(RegisterRequestModel registerRequestModel);
}
