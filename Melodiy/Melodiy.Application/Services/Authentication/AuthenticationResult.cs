namespace Melodiy.Application.Services.Authentication;

public class AuthenticationResult
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
}