namespace Melodiy.Features.User.Models;

public sealed class UserDetailsModel
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string? Avatar { get; set; }
}
