using Melodiy.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Domain.Entities;

//EF can handle many-many relationships however we want the benefits of CreatedAt + UpdatedAt from BaseEntity
[PrimaryKey(nameof(TrackId), nameof(PlaylistId), nameof(Position))]
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