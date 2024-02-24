using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.PlayerService;

public class PlayerResponse
{
    public TrackResponse CurrentTrack { get; set; } = null!;
    public List<TrackPreview> Queue { get; set; } = new();
}