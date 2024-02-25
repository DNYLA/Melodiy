namespace Melodiy.Features.Artist.Entities;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Track.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[Index(nameof(YoutubeId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public sealed class Artist : BaseEntity
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public string? YoutubeId { get; set; }

    public int? UserId { get; set; }

    public int? ImageId { get; set; }

    public List<TrackArtist> TrackArtists { get; set; } = null!;

    public List<Album> Albums { get; set; } = null!;

    public Image? Image { get; set; }

    public User? User { get; set; }
}