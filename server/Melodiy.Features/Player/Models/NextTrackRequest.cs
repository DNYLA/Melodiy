namespace Melodiy.Features.Player.Models;

using Melodiy.Features.Common.Enums;

public sealed class NextTrackRequest
{
    public string TrackId { get; set; }

    public string CollectionId { get; set; }

    public CollectionType Collection { get; set; }
}