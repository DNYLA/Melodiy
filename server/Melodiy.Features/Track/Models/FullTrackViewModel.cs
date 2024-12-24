namespace Melodiy.Features.Track.Models;

public sealed class FullTrackViewModel : TrackViewModel
{
    public string? Path { get; set; }

    //This is set to true if the file is Private + uploaded to the local servers CDN. This means the client needs authorisation to access the file.
    public bool LocalCdnRequestRequired { get; set; }

    public string? YoutubeStreamId { get; set; }
}
