namespace Melodiy.Features.Playlist;

using Melodiy.Features.Playlist.Entities;

public interface IPlaylistRepository
{
    Task AddTrack(int playlistId, int trackId);

    Task<Playlist?> GetBySlugAsync(string slug);

    Task<List<Playlist>> GetByUser(int userId, bool includePrivate);

    Task RemoveTrack(PlaylistTrack track);

    Task SaveAsync(Playlist playlist);

    IPlaylistRepository WithImage();

    IPlaylistRepository WithTrack(string slug);

    IPlaylistRepository WithTracks();

    IPlaylistRepository WithUser();
}