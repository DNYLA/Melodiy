namespace Melodiy.Features.Album.Entities;

using Melodiy.Features.Track.Entities;

using Microsoft.EntityFrameworkCore;

[PrimaryKey(nameof(Position), nameof(TrackId), nameof(AlbumId))]
public sealed class AlbumTrack
{
    public int Position { get; set; }

    public int TrackId { get; set; }

    public int AlbumId { get; set; }

    public Track Track { get; set; } = null!;

    public Album Album { get; set; } = null!;
}