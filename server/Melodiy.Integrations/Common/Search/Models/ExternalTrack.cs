namespace Melodiy.Integrations.Common.Search.Models;

public sealed class ExternalTrack
{
    public string Id { get; set; } = null!;

    public int Position { get; set; }

    public bool Explicit { get; set; }

    public List<ExternalArtist> Artists { get; set; } = null!;

    public ExternalAlbum Album { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public int Duration { get; set; }

    public DateTime ReleaseDate { get; set; }
}