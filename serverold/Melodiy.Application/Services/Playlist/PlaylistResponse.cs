using Melodiy.Application.Services.ImageService;
using Melodiy.Application.Services.TrackService;
using Melodiy.Application.Services.UserService;

namespace Melodiy.Application.Services.Playlist;

public class PlaylistResponse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public List<TrackResponse> Tracks { get; set; } = new();
    public UserResponse User { get; set; } = null!;
    public ImageResponse? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}