namespace Melodiy.Features.Player.Models;

using Melodiy.Features.Track.Models;

public sealed class PlayerViewModel
{
    public FullTrackViewModel CurrentTrack { get; set; } = null!;

    public List<TrackViewModel> Queue { get; set; } = new();
}