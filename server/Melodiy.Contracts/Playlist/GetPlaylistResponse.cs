
using Melodiy.Contracts.Track;
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Playlist;

public class GetPlaylistResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public List<GetTrackResponse> Tracks { get; set; } = new();
    public UserResponse User { get; set; } = null!;
    public string? Image { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}