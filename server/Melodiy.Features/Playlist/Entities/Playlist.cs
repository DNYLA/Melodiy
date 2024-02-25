namespace Melodiy.Features.Playlist.Entities;

using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

[Index(nameof(Slug), IsUnique = true)]
public sealed class Playlist : BaseEntity
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public bool Public { get; set; }

    public int UserId { get; set; }

    public int? ImageId { get; set; }

    public List<PlaylistTrack> PlaylistTracks { get; set; } = null!;

    public User User { get; set; } = null!;

    public Image? Image { get; set; }
}