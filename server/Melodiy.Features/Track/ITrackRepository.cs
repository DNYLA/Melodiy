namespace Melodiy.Features.Track;

using Melodiy.Features.Track.Entities;

public interface ITrackRepository
{
    IQueryable<Track> AsQueryable();

    Task<Track?> GetByIdAsync(int id);

    Task<Track?> GetBySlugAsync(string slug);

    Task<List<Track>> GetByUser(int userId);

    Task SaveAsync(Track track);

    Task SaveAsync(List<Track> tracks);

    ITrackRepository WithAlbum();

    ITrackRepository WithArtists();

    ITrackRepository WithImage(bool include = true);

    ITrackRepository WithUser();
}