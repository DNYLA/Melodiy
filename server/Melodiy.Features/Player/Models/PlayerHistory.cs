namespace Melodiy.Features.Player.Models;

using Melodiy.Features.Common.Enums;
using Melodiy.Features.Player.Enums;
using Melodiy.Features.Track.Models;

//Server Queue and Client Queue are seperate
//Server Queue = Queue of full playlist from start - finish (Could be shuffled)
//Client Queue = List of Next Tracks that will play
public class PlayerHistory
{
    public int Position { get; set; }

    public string CollectionId { get; set; } = null!;

    public CollectionType Collection { get; set; }

    public PlayerShuffle Shuffle { get; set; } = PlayerShuffle.Normal;

    public PlayerMode Mode { get; set; } = PlayerMode.NoRepeat;

    public List<TrackViewModel> Queue { get; set; } = new();

    public CurrentTrackLog CurrentTrack { get; set; } = null!;
}