namespace Melodiy.Features.Authentication.Models;

public sealed class LoginRequestModel
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? UserAgent { get; set; }
}
