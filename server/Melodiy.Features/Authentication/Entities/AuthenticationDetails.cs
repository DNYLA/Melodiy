namespace Melodiy.Features.Authentication.Entities;

using System.ComponentModel.DataAnnotations;

using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[PrimaryKey(nameof(Id), nameof(UserId))]
public class AuthenticationDetails : BaseEntity
{
    public int Id { get; set; }

    public string Salt { get; set; } = null!;

    public string Verifier { get; set; } = null!;

    public int UserId { get; set; }

    public User User { get; set; } = null!;
}