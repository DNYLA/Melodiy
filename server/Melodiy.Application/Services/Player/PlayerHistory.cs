using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.PlayerService;

//Server Queue and Client Queue are seperate
//Server Queue = Queue of full playlist from start - finish (Could be shuffled)
//Client Queue = List of Next Tracks that will play
public class PlayerHistory
{
    public int Position { get; set; }
    public string CollectionId { get; set; } = null!;
    public CollectionType CollectionType { get; set; }
    public bool Shuffle { get; set; } = false;
    public bool Repeat { get; set; } = false;
    public List<TrackPreview> Queue { get; set; } = new();
    public CurrentTrackLog CurrentTrack { get; set; } = null!;
}

public class CurrentTrackLog
{
    public int Id { get; set; }
    public string Slug { get; set; } = null!;
    public int Duration { get; set; }
    public DateTime StartedListening { get; set; }
}