namespace Melodiy.Features.Album;

using Melodiy.Features.Album.Entities;

public interface IAlbumRepository
{
    Task<Album?> GetBySlugAsync(string slug);

    Task SaveAsync(Album album);

    IAlbumRepository WithArtist();

    IAlbumRepository WithImage(bool include = true);

    IAlbumRepository WithTracks();
}