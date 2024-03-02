namespace Melodiy.Features.Artist;

using Melodiy.Features.Artist.Entities;

public interface IArtistRepository
{
    Task<Artist?> GetBySlugAsync(string slug);

    Task SaveAsync(Artist artist);

    IArtistRepository WithImage(bool include = true);

    IArtistRepository WithTracks();
}