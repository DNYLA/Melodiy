using Melodiy.Features.Authentication.Contracts.Responses;
using Melodiy.Features.User.Contracts.Responses;

namespace Melodiy.Features.Authentication.Contracts.Models;

public sealed record AuthenticationModel
{
    public required UserResponse User { get; set; }

    public required string AccessToken { get; set; }

    public required RefreshTokenResponse RefreshToken { get; set; }
}