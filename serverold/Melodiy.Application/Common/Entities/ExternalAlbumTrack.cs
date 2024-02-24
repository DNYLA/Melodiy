namespace Melodiy.Application.Common.Entities;

public class ExternalAlbumTrack
{
    public string Id { get; set; } = null!;
    public int Position { get; set; }
    public List<ExternalArtist> Artists { get; set; } = null!;
    public string Title { get; set; } = null!;
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
}
