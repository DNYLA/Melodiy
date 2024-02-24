namespace Melodiy.Features.User.Entities;

using Melodiy.Features.Common.Context.Entities;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Username), IsUnique = true)]
public sealed class User : BaseEntity
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string? Avatar { get; set; }
}
