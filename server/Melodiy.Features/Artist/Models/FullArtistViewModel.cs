namespace Melodiy.Features.Artist.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Track.Models;

public sealed class FullArtistViewModel : ArtistViewModel
{
    public string? Description { get; set; }

    public int MonthlyListeners { get; set; }

    public List<AlbumViewModel> UserAlbums { get; set; } = new();

    public List<AlbumViewModel> Albums { get; set; } = new();

    public List<AlbumViewModel> Singles { get; set; } = new();

    public List<TrackViewModel> TopTracks { get; set; } = new();
}