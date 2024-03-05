namespace Melodiy.Features.Album;

using Melodiy.Features.Album.Entities;

public interface IAlbumRepository
{
    IQueryable<Album> AsQueryable();

    Task<Album?> GetBySlugAsync(string slug);

    Task SaveAsync(Album album);

    Task SaveAsync(List<Album> albums);

    IAlbumRepository WithArtist();

    IAlbumRepository WithImage(bool include = true);

    IAlbumRepository WithTracks();
}