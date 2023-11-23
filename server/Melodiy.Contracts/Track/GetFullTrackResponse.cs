using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Track;

public class GetFullTrackResponse : GetTrackResponse
{
    public string Path { get; set; } = null!;
}