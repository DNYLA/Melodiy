using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.Playlist;

public class PlaylistResponse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int UserId { get; set; }
    public Image? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}