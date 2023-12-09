using Melodiy.Domain.Common;
using Melodiy.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Domain.Entities;

[Index(nameof(SpotifyId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public class Track : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? FilePath { get; set; }
    public string? SpotifyId { get; set; }
    public string? YoutubeId { get; set; }
    public int Position { get; set; } = 0; //If its not in an album default is 0
    public bool IsPublic { get; set; }
    public SourceType Source { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }

    //Foreign Keys
    public int? AlbumId { get; set; }
    public int? UserId { get; set; }
    public int? ImageId { get; set; }

    //Navigation Properties
    public List<TrackArtist> TrackArtists { get; set; } = null!;
    public Album? Album { get; set; }
    public List<PlaylistTrack> PlaylistTracks { get; set; } = null!;
    public User? User { get; set; }
    public Image? Image { get; set; }
}