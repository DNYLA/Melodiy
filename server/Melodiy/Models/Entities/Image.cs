namespace Melodiy.Models;

public class Image : BaseEntity
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public SourceType Source { get; set; }
    public string? StorageId { get; set; } //Id for supabase bucket if this is a local file

    //Relationships
    public List<Album> Artists { get; set; } = null!;
    public List<Album> Albums { get; set; } = null!;
    public List<Album> Playlists { get; set; } = null!;
    public List<Album> Tracks { get; set; } = null!;
}