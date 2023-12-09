namespace Melodiy.Application.Common.Entities;

public class ExternalFullArtist : ExternalArtist
{
    public List<ExternalAlbum> Albums { get; set; } = new();
}
