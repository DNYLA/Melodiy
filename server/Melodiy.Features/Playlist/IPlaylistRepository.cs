namespace Melodiy.Features.Playlist;

using Melodiy.Features.Playlist.Entities;

public interface IPlaylistRepository
{
    Task AddAsync(Playlist playlist);

    Task<Playlist?> GetBySlugAsync(string slug);

    Task<List<Playlist>> GetByUser(int userId);

    Task SaveAsync(Playlist playlist);

    IPlaylistRepository WithImage();

    IPlaylistRepository WithTracks();

    IPlaylistRepository WithUser();
}