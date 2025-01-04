using Melodiy.Features.Album.Models;
using Melodiy.Features.Playlist.Models;

namespace Melodiy.Features.Profile.Models;

public class ProfileViewModel
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string? Avatar { get; set; }

    public List<PlaylistViewModel> Playlists { get; set; } = new();
}
