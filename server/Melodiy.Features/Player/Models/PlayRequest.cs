namespace Melodiy.Features.Player.Models;

using Melodiy.Features.Common.Enums;

public sealed class PlayRequest
{
    public string CollectionId { get; set; }

    public string? TrackId { get; set; }

    public CollectionType Collection { get; set; }

    public int Position { get; set; } = 0;

    public bool Shuffle { get; set; } = false;
}