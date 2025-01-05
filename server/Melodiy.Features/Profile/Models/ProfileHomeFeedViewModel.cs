namespace Melodiy.Features.Profile.Models;

using Melodiy.Features.Playlist.Models;

public class ProfileHomeFeedViewModel
{
    public List<PlaylistViewModel> Playlists { get; set; } = new();
}