using Microsoft.EntityFrameworkCore;

namespace Melodiy.Models;

[Index(nameof(SpotifyId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public class Album : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? SpotifyId { get; set; }
    public DateTime ReleaseDate { get; set; }
    public AlbumType Type { get; set; }

    //Foreign Keys
    public int? ImageId { get; set; }

    //Navigation Properties
    public List<Track> Tracks { get; set; } = null!;
    public List<Artist> Artists { get; set; } = null!;
    public Image? Image { get; set; }
}