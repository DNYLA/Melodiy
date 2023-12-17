using Melodiy.Contracts.User;

namespace Melodiy.Contracts.Artist;

public class GetArtistResponse
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public UserResponse? User { get; set; } = null!;
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}