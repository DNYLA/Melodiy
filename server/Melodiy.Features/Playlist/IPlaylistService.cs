namespace Melodiy.Features.Playlist;

using Melodiy.Features.Playlist.Models;
using Melodiy.Features.Track.Models;

public interface IPlaylistService
{
    Task<PlaylistResponse> Create(CreatePlaylistRequest createPlaylistForm);

    Task<PlaylistResponse> Get(string slug, int? userId);

    Task<List<PlaylistResponse>> GetAll(int userId, bool includePrivate);

    Task<TrackResponse> AddTrack(string id, string trackId, int userId);

    Task<TrackResponse> RemoveTrack(string id, string trackId, int userId);
}