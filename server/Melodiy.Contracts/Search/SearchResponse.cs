using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.Track;

namespace Melodiy.Contracts.Search;

public class SearchResponse
{
    public List<GetAlbumResponse> Albums { get; set; } = new();
    public List<GetArtistResponse> Artists { get; set; } = new();
    public List<GetTrackResponse> Tracks { get; set; } = new();
}