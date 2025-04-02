using Melodiy.Features.Common.Context.Entities;

namespace Melodiy.Features.Authentication.Entities;

using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[PrimaryKey(nameof(Id))]
public class UserKey : BaseEntity
{
    public int Id { get; set; }

    public string PublicKey { get; set; } = null!;

    public string PrivateKey { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public int UserId { get; set; }

    public User User { get; set; } = null!;
}