using Melodiy.Domain.Common;

namespace Melodiy.Domain.Entities;
public class Playlist : BaseEntity
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;

    //Foreign Keys
    public int UserId { get; set; }
    public int? ImageId { get; set; }

    //Navigation Properties
    public List<PlaylistTrack> PlaylistTracks { get; set; } = null!;
    public User User { get; set; } = null!;
    public Image? Image { get; set; }
}