namespace Melodiy.Features.Image.Entities;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.Track.Entities;
using Melodiy.Features.User.Entities;
using Melodiy.Integrations.Common;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Path), IsUnique = true)]
public sealed class Image : BaseEntity
{
    public int Id { get; set; }

    public string Url { get; set; } = string.Empty;

    public string? Path { get; set; }

    public SourceType Source { get; set; }

    public int? UserId { get; set; }

    public User? User { get; set; } = null!;

    public List<Artist> Artists { get; set; } = null!;

    public List<Album> Albums { get; set; } = null!;

    public List<Playlist> Playlists { get; set; } = null!;

    public List<Track> Tracks { get; set; } = null!;
}