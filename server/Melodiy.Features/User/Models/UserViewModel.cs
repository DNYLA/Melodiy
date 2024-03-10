namespace Melodiy.Features.User.Models;

public sealed class UserViewModel
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string? Avatar { get; set; }
}
