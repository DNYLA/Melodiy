using Melodiy.Features.User.Models;

namespace Melodiy.Features.Profile;

using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Playlist;
using Melodiy.Features.Profile.Models;
using Melodiy.Features.User;

public sealed class ProfileService(IUserRepository userRepository, IPlaylistService playlistService)
    : IProfileService
{
    public async Task<ProfileViewModel?> GetProfile(string username, bool includePrivate)
    {
        var user = await userRepository.GetByUsername(username);
        if (user == null) return null;

        var playlists = await playlistService.GetAll(user.Id, includePrivate);

        return new ProfileViewModel
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar,
            Playlists = playlists.Select(playlist => playlist.ToViewModel()).ToList()
        };
    }

    public async Task<ProfileHomeFeedViewModel> GetHomeFeed(UserResponse? user)
    {
        var model = new ProfileHomeFeedViewModel();

        if (user == null)
        {
            var playlists = await playlistService.GetLatest(8);
            model.Playlists = playlists.Select(x => x.ToViewModel()).ToList();
        }
        else
        {
            var playlists = await playlistService.GetAll(user.Id, true, 8);
            model.Playlists = playlists.Select(x => x.ToViewModel()).ToList();
        }

        return model;
    }
}