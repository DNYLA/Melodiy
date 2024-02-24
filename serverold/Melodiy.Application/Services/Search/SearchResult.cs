using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.SearchService;

public class SearchResult
{
    public List<AlbumResponse> Albums { get; set; } = new();
    public List<ArtistResponse> Artists { get; set; } = new();
    public List<TrackResponse> Tracks { get; set; } = new();
}