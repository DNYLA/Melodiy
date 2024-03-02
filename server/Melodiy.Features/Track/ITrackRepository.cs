namespace Melodiy.Features.Track;

using Melodiy.Features.Track.Entities;

public interface ITrackRepository
{
    Task<Track?> GetByIdAsync(int id);

    Task<Track?> GetBySlugAsync(string slug);

    Task<List<Track>> GetByUser(int userId);

    Task SaveAsync(Track track);

    ITrackRepository WithAlbum();

    ITrackRepository WithArtists();

    ITrackRepository WithImage();

    ITrackRepository WithUser();
}