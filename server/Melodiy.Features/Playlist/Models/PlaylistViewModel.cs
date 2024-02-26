namespace Melodiy.Features.Playlist.Models;

using Melodiy.Features.Track.Models;
using Melodiy.Features.User.Models;

public sealed class PlaylistViewModel
{
    public string Id { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public bool Public { get; set; }

    public List<TrackViewModel> Tracks { get; set; } = new();

    public UserViewModel User { get; set; } = null!;

    public string? Image { get; set; }

    public DateTime CreatedAt { get; set; }
}