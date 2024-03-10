namespace Melodiy.Features.Track.Entities;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Context.Entities;

using Microsoft.EntityFrameworkCore;

[PrimaryKey(nameof(TrackId), nameof(ArtistId))]
public class TrackArtist : BaseEntity
{
    public int TrackId { get; set; }
     
    public int ArtistId { get; set; }

    public Track Track { get; set; } = null!;

    public Artist Artist { get; set; } = null!;

    public bool IsPrimary { get; set; }
}