namespace Melodiy.Features.Search.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Track.Models;

public sealed class SearchResultViewModel
{
    public List<AlbumViewModel> Albums { get; set; } = new();

    public List<ArtistViewModel> Artists { get; set; } = new();

    public List<TrackViewModel> Tracks { get; set; } = new();
}