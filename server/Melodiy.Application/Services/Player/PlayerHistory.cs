using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.PlayerService;

public class PlayerHistory
{
    public string CollectionId { get; set; } = null!;
    public CollectionType CollectionType { get; set; }
    public bool Shuffle { get; set; } = false;
    public bool Repeat { get; set; } = false;
    public List<TrackPreview> NextTracks { get; set; } = new();
    public List<TrackPreview> PreviousTracks { get; set; } = new();
    public CurrentTrackLog CurrentTrack { get; set; } = null!;
}

public class CurrentTrackLog
{
    public string TrackSlug { get; set; } = null!;
    public int TrackDurationMs { get; set; }
    public DateTime StartedListening { get; set; }
}