namespace Melodiy.Features.Playlist.Entities;

using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Track.Entities;

using Microsoft.EntityFrameworkCore;

[PrimaryKey(nameof(TrackId), nameof(PlaylistId), nameof(Position))]
public class PlaylistTrack : BaseEntity
{
    public int Position { get; set; }

    public int TrackId { get; set; }

    public int PlaylistId { get; set; }

    public Track Track { get; set; } = null!;

    public Playlist Playlist { get; set; } = null!;
}