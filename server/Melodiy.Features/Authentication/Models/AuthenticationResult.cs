namespace Melodiy.Features.Authentication.Models;

using Melodiy.Features.User.Models;

public sealed class AuthenticationResult
{
    public UserViewModel User { get; set; } = null!;

    public string AccessToken { get; set; } = null!;

    public RefreshTokenModel RefreshToken { get; set; }
}
