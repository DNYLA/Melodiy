using Melodiy.Contracts.Track;

namespace Melodiy.Contracts.Player;

public class GetPlayerResponse
{
    public GetFullTrackResponse CurrentTrack { get; set; } = null!;
    public List<GetTrackResponse> Queue { get; set; } = new();
}