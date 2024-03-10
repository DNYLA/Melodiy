namespace Melodiy.Features.Player.Models;

public sealed class CurrentTrackLog
{
    public int Id { get; set; }

    public string Slug { get; set; } = null!;

    public int Duration { get; set; }

    public DateTime StartedListening { get; set; }
}