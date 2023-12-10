using Melodiy.Contracts.Artist;
using Melodiy.Contracts.Track;
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Album;

public class GetAlbumResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public AlbumType Type { get; set; }
    public List<GetArtistResponse> Artists { get; set; } = new();
    public List<GetTrackResponse> Tracks { get; set; } = new();
    public UserResponse? User { get; set; } = null!;
    public string? Image { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime CreatedAt { get; set; }
}