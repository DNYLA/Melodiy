namespace Melodiy.Features.Search.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Integrations.Common;

public sealed class SearchResult
{
    public List<AlbumResponse> Albums { get; set; } = new();

    public List<ArtistResponse> Artists { get; set; } = new();

    public List<TrackResponse> Tracks { get; set; } = new();

    public SourceType Source { get; set; }
}