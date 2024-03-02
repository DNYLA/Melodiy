using Melodiy.Features.User.Models;

namespace Melodiy.Features.Artist.Models;

public class ArtistViewModel
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public UserViewModel? User { get; set; } = null!;

    public string? Image { get; set; }

    public DateTime CreatedAt { get; set; }
}