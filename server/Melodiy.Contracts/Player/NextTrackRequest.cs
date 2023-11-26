namespace Melodiy.Contracts.Player;

public class NextTrackRequest
{
    public string CollectionId { get; set; } = null!;
    public CollectionType Type { get; set; }
}