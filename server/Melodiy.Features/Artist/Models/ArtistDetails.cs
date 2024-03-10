namespace Melodiy.Features.Artist.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Track.Models;

public sealed class ArtistDetails : ArtistResponse
{
    public string? Description { get; set; }

    public int MonthlyListeners { get; set; }

    public List<AlbumResponse> UserAlbums { get; set; } = new();

    public List<AlbumResponse> Albums { get; set; } = new();

    public List<AlbumResponse> Singles { get; set; } = new();

    public List<TrackResponse> TopTracks { get; set; } = new();
}