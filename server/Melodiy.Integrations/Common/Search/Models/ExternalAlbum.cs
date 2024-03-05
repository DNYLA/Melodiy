namespace Melodiy.Integrations.Common.Search.Models;

public sealed class ExternalAlbum
{
    public string Id { get; set; } = null!;

    public List<ExternalArtist> Artists { get; set; } = new();

    public List<ExternalTrack> Tracks { get; set; } = new();

    public string Title { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public DateTime ReleaseDate { get; set; }

    public ExternalAlbumType Type { get; set; }
}