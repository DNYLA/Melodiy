using Melodiy.Domain.Enums;

namespace Melodiy.Application.Common.Entities;

public class ExternalAlbum
{
    public string Id { get; set; } = null!;
    public string ArtistId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }
    public AlbumType Type { get; set; }
}