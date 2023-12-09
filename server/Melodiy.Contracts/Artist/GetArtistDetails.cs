using Melodiy.Contracts.Album;
using Melodiy.Contracts.Track;

namespace Melodiy.Contracts.Artist;

public class GetArtistDetails : GetArtistResponse
{
    public string? Description { get; set; }
    public int MonthlyListeners { get; set; }
    public List<GetAlbumResponse> Albums { get; set; } = new();
    public List<GetAlbumResponse> Singles { get; set; } = new();
    public List<GetTrackResponse> TopTracks { get; set; } = new();
}