namespace Melodiy.Features.Playlist;

using Melodiy.Features.Playlist.Entities;

public interface IPlaylistRepository
{
    Task AddAsync(Playlist playlist);

    Task<Playlist?> GetByIdAsync(string slug);

    Task<List<Playlist>> GetByUser(int userId);

    Task UpdateAsync(Playlist playlist);

    PlaylistRepository WithImage();

    PlaylistRepository WithTracks();

    PlaylistRepository WithUser();
}