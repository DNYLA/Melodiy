namespace Melodiy.Features.Authentication.Contracts.Requests;

public sealed class LoginRequest
{
    public required string Username { get; set; }

    public required string Password { get; set; }

    public string? UserAgent { get; set; }
}