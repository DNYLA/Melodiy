using Microsoft.EntityFrameworkCore;

namespace Melodiy.Models;
[Index(nameof(Username), IsUnique = true)]
public class User : BaseEntity
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}