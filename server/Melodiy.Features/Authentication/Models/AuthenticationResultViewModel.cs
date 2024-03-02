namespace Melodiy.Features.Authentication.Models;

using Melodiy.Features.User.Models;

public sealed class AuthenticationResultViewModel
{
    public UserViewModel User { get; set; } = null!;

    public string AccessToken { get; set; } = null!;
}
