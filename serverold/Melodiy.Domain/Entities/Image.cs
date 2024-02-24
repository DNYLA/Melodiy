using Melodiy.Domain.Common;
using Melodiy.Domain.Enums;

namespace Melodiy.Domain.Entities;

public class Image : BaseEntity
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? Path { get; set; } //The path where the local file was uploaded to. e.g Dan/image.png
    public SourceType Source { get; set; }

    //Foreign Keys
    public int? UserId { get; set; }

    //Relationships
    public User? User { get; set; } = null!;
    public List<Artist> Artists { get; set; } = null!;
    public List<Album> Albums { get; set; } = null!;
    public List<Playlist> Playlists { get; set; } = null!;
    public List<Track> Tracks { get; set; } = null!;
}