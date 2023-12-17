namespace Melodiy.Application.Common.Entities;

public class ExternalSearchResult
{
    public List<ExternalAlbum> Albums { get; set; } = new();
    public List<ExternalArtist> Artists { get; set; } = new();
    public List<ExternalTrack> Tracks { get; set; } = new();
}