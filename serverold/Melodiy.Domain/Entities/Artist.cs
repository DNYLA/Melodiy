using Melodiy.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Domain.Entities;

[Index(nameof(ExternalSearchId), IsUnique = true)]
[Index(nameof(Slug), IsUnique = true)]
public class Artist : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? ExternalSearchId { get; set; }

    //Foreign Keys
    public int? UserId { get; set; }
    public int? ImageId { get; set; }

    //Navigation Properties
    public List<TrackArtist> TrackArtists { get; set; } = null!;
    public List<Album> Albums { get; set; } = null!;
    public Image? Image { get; set; }
    public User? User { get; set; }
}