namespace Melodiy.Features.Authentication.Entities;

using Melodiy.Features.Common.Data.Entities;
using Melodiy.Features.User.Entities;

using System.ComponentModel.DataAnnotations;

public class AuthenticationDetails : BaseEntity
{
    [Key]
    public int UserId { get; init; }

    [MaxLength(500)]
    [Required]
    public string? PasswordHash { get; init; }

    public UserEntity? User { get; set; }
}