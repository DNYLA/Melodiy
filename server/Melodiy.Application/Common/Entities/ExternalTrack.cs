using Melodiy.Domain.Enums;

namespace Melodiy.Application.Common.Entities;

public class ExternalTrack
{
    public string Id { get; set; } = null!;
    public List<ExternalArtist> Artists { get; set; } = null!;
    public ExternalAlbum Album { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
}