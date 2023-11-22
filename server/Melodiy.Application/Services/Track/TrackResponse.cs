using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ImageService;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Enums;

namespace Melodiy.Application.Services.TrackService;

public class TrackResponse
{
    public string Id { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? FilePath { get; set; }
    public string? SpotifyId { get; set; }
    public string? YoutubeId { get; set; }
    public int Position { get; set; }
    public bool IsPublic { get; set; }
    public SourceType Source { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public AlbumResponse? Album { get; set; }
    public UserResponse? User { get; set; }
    public ImageResponse? Image { get; set; }
}