namespace Melodiy.Features.Track.Models;

using Melodiy.Integrations.Common;

public sealed class ExternalTrackDetails
{
    public string? Path { get; set; }

    public string? SpotifyId { get; set; }

    public string? YoutubeId { get; set; }

    public SourceType Source { get; set; }
}