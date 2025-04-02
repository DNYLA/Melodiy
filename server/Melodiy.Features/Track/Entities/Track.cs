namespace Melodiy.Features.Track.Entities;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.User.Entities;
using Melodiy.Integrations.Common;

using Microsoft.EntityFrameworkCore;

[Index(nameof(SpotifyId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public sealed class Track : BaseEntity
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public int Views { get; set; } = 0;

    public string? Path { get; set; }

    public string? SpotifyId { get; set; }

    public string? YoutubeId { get; set; }

    public bool Explicit { get; set; }

    public bool Public { get; set; }

    public bool Encrypted { get; set; }

    public SourceType Source { get; set; }

    public int Duration { get; set; }

    public DateTime ReleaseDate { get; set; }

    public int? UserId { get; set; }

    public int? ImageId { get; set; }

    public List<TrackArtist> TrackArtists { get; set; } = null!;

    public List<PlaylistTrack> PlaylistTracks { get; set; } = null!;

    public AlbumTrack? AlbumTrack { get; set; }

    public User? User { get; set; }

    public Image? Image { get; set; }
}