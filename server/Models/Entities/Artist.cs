using Microsoft.EntityFrameworkCore;

namespace Melodiy.Models;

[Index(nameof(SpotifyId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public class Artist : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? SpotifyId { get; set; }

    //Foreign Keys
    public int? ImageId { get; set; }

    //Navigation Properties
    public Image? Image { get; set; }
    public List<TrackArtist> TrackArtists { get; set; } = null!;
    public List<Album> Albums { get; set; } = null!;
}