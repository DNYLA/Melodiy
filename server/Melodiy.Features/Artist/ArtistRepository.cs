namespace Melodiy.Features.Artist;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Context;

using Microsoft.EntityFrameworkCore;

public sealed class ArtistRepository(MelodiyDbContext context) : IArtistRepository
{
    private readonly DbSet<Artist> _artists = context.Set<Artist>();

    public async Task<Artist?> GetBySlugAsync(string slug)
    {
        return await _artists.FirstOrDefaultAsync(artist => artist.Slug == slug);
    }

    public async Task SaveAsync(Artist artist)
    {
        if (string.IsNullOrEmpty(artist.Slug))
        {
            artist.Slug = Guid.NewGuid().ToString("N");
            _artists.Add(artist);
        }

        await context.SaveChangesAsync();
    }

    public IArtistRepository WithImage(bool include)
    {
        if (!include)
        {
            return this;
        }

        _artists.Include(artist => artist.Image).Load();

        return this;
    }

    public IArtistRepository WithTracks()
    {
        throw new NotImplementedException();
    }
}