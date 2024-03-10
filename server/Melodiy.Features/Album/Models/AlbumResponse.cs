namespace Melodiy.Features.Album.Models;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Image.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Features.User.Models;

public sealed class AlbumResponse
{
    public int Id { get; set; }

    public string Slug { get; set; }

    public string Title { get; set; }

    public bool Verified { get; set; }

    public AlbumType Type { get; set; }

    public DateTime ReleaseDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public ExternalAlbumDetails ExternalDetails { get; set; } = new();

    public List<ArtistResponse> Artists { get; set; } = new();

    public List<TrackResponse> Tracks { get; set; } = new();

    public UserResponse? User { get; set; } = null!;

    public ImageResponse? Image { get; set; }
}