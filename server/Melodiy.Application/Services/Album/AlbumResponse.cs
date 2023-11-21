using Melodiy.Application.Services.ImageService;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Enums;

namespace Melodiy.Application.Services.AlbumService;

public class AlbumResponse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? SpotifyId { get; set; }
    public DateTime ReleaseDate { get; set; }
    public AlbumType Type { get; set; }
    public UserResponse? User { get; set; } = null!;
    public ImageResponse? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}