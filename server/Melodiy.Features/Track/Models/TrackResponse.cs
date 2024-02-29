namespace Melodiy.Features.Track.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Artist;
using Melodiy.Features.Image.Models;
using Melodiy.Features.User.Models;

public sealed class TrackResponse
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public int Views { get; set; }

    public bool Public { get; set; }

    public int Duration { get; set; }

    public DateTime ReleaseDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public ExternalTrackDetails ExternalDetails { get; set; } = new();

    public List<ArtistResponse> Artists { get; set; } = new();

    public AlbumResponse? Album { get; set; }

    public UserResponse? User { get; set; }

    public ImageResponse? Image { get; set; }
}
