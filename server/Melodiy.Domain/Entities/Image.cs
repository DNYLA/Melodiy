using Melodiy.Domain.Common;
using Melodiy.Domain.Enums;

namespace Melodiy.Domain.Entities;

public class Image : BaseEntity
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public SourceType Source { get; set; }
    public string? StorageId { get; set; } //Id for supabase bucket if this is a local file

    //Relationships
    public List<Artist> Artists { get; set; } = null!;
    public List<Album> Albums { get; set; } = null!;
    public List<Playlist> Playlists { get; set; } = null!;
    public List<Track> Tracks { get; set; } = null!;
}