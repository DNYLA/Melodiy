using Melodiy.Domain.Enums;

namespace Melodiy.Application.Common.Entities;

public class ExternalAlbum
{
    public string Id { get; set; } = null!;
    public List<ExternalArtist> Artists { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public DateTime ReleaseDate { get; set; }
    public AlbumType Type { get; set; }
}