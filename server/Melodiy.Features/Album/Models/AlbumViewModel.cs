namespace Melodiy.Features.Album.Models;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Track.Models;

public sealed class AlbumViewModel
{
    public string Id { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public bool Verified { get; set; }

    public CollectionType Type { get; set; }

    public List<ArtistPreview> Artists { get; set; } = new();

    public List<TrackViewModel> Tracks { get; set; } = new();

    public string? Image { get; set; }

    public DateTime ReleaseDate { get; set; }

    public DateTime CreatedAt { get; set; }
}