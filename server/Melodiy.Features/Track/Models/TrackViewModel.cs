namespace Melodiy.Features.Track.Models;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.User.Models;

public class TrackViewModel
{
    public string Id { get; set; }

    public string Title { get; set; }

    public int Views { get; set; }

    public int Duration { get; set; }

    public DateTime ReleaseDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<ArtistPreview> Artists { get; set; } = new();

    public AlbumPreview? Album { get; set; }

    public UserViewModel? User { get; set; }

    public string? Image { get; set; }
}