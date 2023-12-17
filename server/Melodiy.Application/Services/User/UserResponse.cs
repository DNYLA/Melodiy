namespace Melodiy.Application.Services.UserService;

public class UserResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? Avatar { get; set; }
}