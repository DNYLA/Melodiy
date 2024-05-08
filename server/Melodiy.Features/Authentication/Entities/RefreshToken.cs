namespace Melodiy.Features.Authentication.Entities;

using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[Index(nameof(Token), IsUnique = true)]
public class RefreshToken : BaseEntity
{
    public int Id { get; set; }

    public string? Token { get; set; }

    public DateTime Expires { get; set; }

    //TODO: Not used, but we can verify UserAgent when refreshing
    public string? UserAgent { get; set; }

    public int UserId { get; set; }

    public User User { get; set; } = null!;
}