namespace Melodiy.Integrations.Common.Search.Models;

public class ExternalArtist
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string? ImageUrl { get; set; }

    public List<ExternalAlbum> Albums { get; set; } = new();
}