namespace Melodiy.Contracts.Authentication;

public class AuthenticationResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
}