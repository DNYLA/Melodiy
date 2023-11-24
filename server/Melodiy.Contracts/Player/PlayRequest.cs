namespace Melodiy.Contracts.Player;

public class PlayRequest
{
    public string TrackId { get; set; } = null!;
    public string CollectionId { get; set; } = null!;
    public CollectionType Type { get; set; }
    public int Position { get; set; } = 0;
    public bool Shuffle { get; set; } = false;
}