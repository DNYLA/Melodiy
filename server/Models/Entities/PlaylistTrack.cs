namespace Melodiy.Models;

//EF can handle many-many relationships however we want the benefits of CreatedAt + UpdatedAt from BaseEntity
public class PlaylistTrack : BaseEntity
{
    public int Position { get; set; }

    //Foreign Keys
    public int TrackId { get; set; }
    public int PlaylistId { get; set; }

    //Navigation Properties
    public Track Track { get; set; } = null!;
    public Playlist Playlist { get; set; } = null!;
}