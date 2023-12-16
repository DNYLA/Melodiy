using Microsoft.EntityFrameworkCore;

namespace Melodiy.Domain.Entities;

[PrimaryKey(nameof(TrackId), nameof(AlbumId), nameof(Position))]
public class AlbumTrack
{
    public int Position { get; set; }

    //Foreign Keys
    public int TrackId { get; set; }
    public int AlbumId { get; set; }

    //Navigation Properties
    public Track Track { get; set; } = null!;
    public Album Album { get; set; } = null!;
}