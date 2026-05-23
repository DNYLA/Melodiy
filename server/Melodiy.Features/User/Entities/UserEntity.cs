namespace Melodiy.Features.User.Entities;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Data.Entities;
using Melodiy.Features.User.Enums;

using Microsoft.EntityFrameworkCore;

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

[Index(nameof(Username), IsUnique = true)]
public sealed class UserEntity : BaseEntity
{
    public int Id { get; init; }

    [MaxLength(30)]
    [Required]
    public string Username { get; init; } = null!;

    [MaxLength(500)]
    public string? Avatar { get; set; }

    [Required]
    [DefaultValue(UserRole.Default)]
    public UserRole Role { get; set; }

    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];

    public AuthenticationDetails AuthenticationDetails { get; set; } = null!;
}