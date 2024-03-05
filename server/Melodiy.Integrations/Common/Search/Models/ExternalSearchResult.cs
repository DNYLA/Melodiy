namespace Melodiy.Integrations.Common.Search.Models;

public sealed class ExternalSearchResult
{
    public List<ExternalAlbum> Albums { get; set; } = new();

    public List<ExternalArtist> Artists { get; set; } = new();

    public List<ExternalTrack> Tracks { get; set; } = new();

    public SourceType Source { get; set; }
}