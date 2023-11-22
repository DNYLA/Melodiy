using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Track;

public class GetTrackResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<TrackArtistResponse> Artists { get; set; } = new();
    public TrackAlbumResponse? Album { get; set; }
    public UserResponse? User { get; set; }
    public string? Image { get; set; } = string.Empty;
}