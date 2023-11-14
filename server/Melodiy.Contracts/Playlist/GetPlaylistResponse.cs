
using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Playlist;

public class GetPlaylistResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public UserResponse User { get; set; } = null!;
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}