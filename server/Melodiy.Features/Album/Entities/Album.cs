namespace Melodiy.Features.Album.Entities;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[Index(nameof(SpotifyId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public sealed class Album : BaseEntity
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public DateTime ReleaseDate { get; set; }

    public CollectionType Type { get; set; }

    public bool Indexed { get; set; } = false;

    public string? SpotifyId { get; set; }

    public int? ImageId { get; set; }

    public int? UserId { get; set; }

    public List<AlbumTrack> AlbumTracks { get; set; } = new();

    public List<Artist> Artists { get; set; } = new();

    public Image? Image { get; set; }

    public User? User { get; set; }
}