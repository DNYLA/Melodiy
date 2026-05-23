namespace Melodiy.Features.Authentication.Entities;

using Melodiy.Features.Common.Data.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

using System;
using System.ComponentModel.DataAnnotations;

[Index(nameof(Token), IsUnique = true)]
[Index(nameof(UserId))]
public class RefreshToken : BaseEntity
{
    public int Id { get; init; }

    [MaxLength(500)]
    public string Token { get; init; } = null!;

    public DateTimeOffset Expires { get; init; }

    [MaxLength(500)]
    public string? UserAgent { get; init; }

    public int UserId { get; init; }

    public UserEntity User { get; set; } = null!;
}