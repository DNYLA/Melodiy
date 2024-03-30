namespace Melodiy.Features.Authentication.Models;

public sealed class RegisterRequestModel
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? UserAgent { get; set; }
}
