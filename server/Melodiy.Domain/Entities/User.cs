using Melodiy.Domain.Common;

namespace Melodiy.Domain.Entities;

public class User : BaseEntity
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}