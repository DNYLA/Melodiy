namespace Melodiy.Features.Album;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Common.Context;

using Microsoft.EntityFrameworkCore;

public sealed class AlbumRepository(MelodiyDbContext context) : IAlbumRepository
{
    private readonly DbSet<Album> _albums = context.Set<Album>();

    public IQueryable<Album> AsQueryable()
    {
        return _albums.AsQueryable();
    }

    public async Task<Album?> GetBySlugAsync(string slug)
    {
        return await _albums.FirstOrDefaultAsync(artist => artist.Slug == slug);
    }

    public async Task SaveAsync(Album album)
    {
        if (string.IsNullOrEmpty(album.Slug))
        {
            album.Slug = Guid.NewGuid().ToString("N");
            _albums.Add(album);
        }

        await context.SaveChangesAsync();
    }

    public async Task SaveAsync(List<Album> albums)
    {
        foreach (var album in albums.Where(album => string.IsNullOrEmpty(album.Slug)))
        {
            album.Slug = Guid.NewGuid().ToString("N");
            _albums.Add(album);
        }

        await context.SaveChangesAsync();
    }

    public IAlbumRepository WithArtist()
    {
        _albums.Include(artist => artist.Artists).Load();

        return this;
    }

    public IAlbumRepository WithImage(bool include = true)
    {
        if (!include)
        {
            return this;
        }

        _albums.Include(artist => artist.Image).Load();

        return this;
    }

    public IAlbumRepository WithTracks()
    {
        throw new NotImplementedException();
    }
}