using Melodiy.Application.Services.ImageService;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.ArtistService;

public class ArtistResponse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? SpotifyId { get; set; }
    public UserResponse? User { get; set; } = null!;
    public ImageResponse? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}