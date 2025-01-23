namespace Melodiy.Features.Authentication.Models;

using Melodiy.Features.User.Models;

public sealed class AuthenticationResult
{
    public required UserViewModel User { get; set; }

    public string? ServerProof { get; set; }

    public required string AccessToken { get; set; }

    public required RefreshTokenModel RefreshToken { get; set; }
}
