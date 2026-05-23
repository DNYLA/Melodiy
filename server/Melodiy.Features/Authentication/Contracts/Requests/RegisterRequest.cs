namespace Melodiy.Features.Authentication.Contracts.Requests;

public sealed record RegisterRequest
{
    public required string Username { get; set; }

    public required string Password { get; set; }

    public string? UserAgent { get; set; }
}