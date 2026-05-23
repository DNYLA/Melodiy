namespace Melodiy.Features.Authentication.Contracts.Responses;

public sealed record RefreshTokenResponse
{
    public required string Token { get; set; }

    public DateTimeOffset Expires { get; set; }
}
