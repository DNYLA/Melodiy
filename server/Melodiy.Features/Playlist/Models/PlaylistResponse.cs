namespace Melodiy.Features.Playlist.Models;

using Melodiy.Features.Image.Models;
using Melodiy.Features.Track.Models;

public sealed class PlaylistResponse
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public bool Public { get; set; }

    public int UserId { get; set; }

    public List<TrackViewModel> Tracks { get; set; } = new();

    public ImageResponse? Image { get; set; }

    public DateTime CreatedAt { get; set; }
}