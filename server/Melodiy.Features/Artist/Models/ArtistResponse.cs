namespace Melodiy.Features.Artist.Models;

using Melodiy.Features.Image.Models;
using Melodiy.Features.User.Models;

public class ArtistResponse
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public ExternalArtistDetails ExternalDetails { get; set; } = new();

    public UserResponse? User { get; set; } = null!;

    public ImageResponse? Image { get; set; }

    public DateTime CreatedAt { get; set; }
}