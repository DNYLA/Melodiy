using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Track;

public class GetTrackResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Views { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<GetArtistPreview> Artists { get; set; } = new();
    public GetAlbumPreview? Album { get; set; }
    public UserResponse? User { get; set; }
    public string? Image { get; set; } = string.Empty;
}