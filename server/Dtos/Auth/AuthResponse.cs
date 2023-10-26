namespace Melodiy.Dtos.Auth;

#nullable disable
public class AuthResponse
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string AccessToken { get; set; } = string.Empty;

}