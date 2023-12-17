namespace Melodiy.Contracts.Player;

public class NextTrackRequest
{
    public string TrackId { get; set; } = null!;
    public string CollectionId { get; set; } = null!;
    public CollectionType Type { get; set; }
}