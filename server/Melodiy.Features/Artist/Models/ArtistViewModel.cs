namespace Melodiy.Features.Artist.Models;

public class ArtistViewModel
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public string? Image { get; set; }

    public DateTime CreatedAt { get; set; }
}