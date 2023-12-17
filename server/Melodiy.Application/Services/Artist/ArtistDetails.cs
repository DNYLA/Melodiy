using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.ArtistService;
public class ArtistDetails : ArtistResponse
{
    public string? Description { get; set; }
    public int MonthlyListeners { get; set; }
    public List<AlbumResponse> UserAlbums { get; set; } = new();
    public List<AlbumResponse> Albums { get; set; } = new();
    public List<AlbumResponse> Singles { get; set; } = new();
    public List<TrackResponse> TopTracks { get; set; } = new();
}
