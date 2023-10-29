namespace Melodiy.Models;

//EF can handle many-many relationships however we want to know who the primary artist is.
public class TrackArtist : BaseEntity
{
    public int TrackId { get; set; }
    public int ArtistId { get; set; }

    public Track Track { get; set; } = null!;
    public Artist Artist { get; set; } = null!;

    public bool IsPrimary { get; set; }
}