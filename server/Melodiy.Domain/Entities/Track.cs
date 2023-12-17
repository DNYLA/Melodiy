using Melodiy.Domain.Common;
using Melodiy.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Domain.Entities;

[Index(nameof(ExternalSearchId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public class Track : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Views { get; set; } = 0;
    public string? FilePath { get; set; }
    public string? ExternalSearchId { get; set; }
    public string? ExternalStreamId { get; set; }
    public bool IsPublic { get; set; }
    public SourceType Source { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }

    //Foreign Keys
    public int? UserId { get; set; }
    public int? ImageId { get; set; }

    //Navigation Properties
    public List<TrackArtist> TrackArtists { get; set; } = null!;
    public List<PlaylistTrack> PlaylistTracks { get; set; } = null!;
    public AlbumTrack? AlbumTrack { get; set; }
    public User? User { get; set; }
    public Image? Image { get; set; }
}