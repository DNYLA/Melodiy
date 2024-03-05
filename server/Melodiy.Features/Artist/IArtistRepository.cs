namespace Melodiy.Features.Artist;

using Melodiy.Features.Artist.Entities;

public interface IArtistRepository
{
    IQueryable<Artist> AsQueryable();

    Task<Artist?> GetBySlugAsync(string slug);

    Task SaveAsync(Artist artist);
    
    Task SaveAsync(List<Artist> artists);

    IArtistRepository WithImage(bool include = true);

    IArtistRepository WithTracks();
}