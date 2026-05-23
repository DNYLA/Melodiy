namespace Melodiy.Features.Authentication.Contracts.Responses;

using Melodiy.Features.User.Contracts.Responses;

public sealed record AuthenticationResponse
{
    public required UserResponse User { get; set; }

    public required string AccessToken { get; set; }
}