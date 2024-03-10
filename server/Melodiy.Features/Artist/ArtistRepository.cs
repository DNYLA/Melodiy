namespace Melodiy.Features.Artist;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Context;

using Microsoft.EntityFrameworkCore;

public sealed class ArtistRepository(MelodiyDbContext context) : IArtistRepository
{
    private readonly DbSet<Artist> _artists = context.Set<Artist>();

    public IQueryable<Artist> AsQueryable()
    {
        return _artists.AsQueryable();
    }

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

    public async Task SaveAsync(List<Artist> artists)
    {
        foreach (var artist in artists.Where(artist => string.IsNullOrEmpty(artist.Slug)))
        {
            artist.Slug = Guid.NewGuid().ToString("N");
            _artists.Add(artist);
        }

        await context.SaveChangesAsync();
    }

    public IArtistRepository WithAlbums()
    {
        _artists.Include(artist => artist.Albums).ThenInclude(album => album.Image).Load();

        return this;
    }

    public IArtistRepository WithImage(bool include = true)
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
        _artists.Include(artist => artist.TrackArtists.OrderBy(trackArtist => trackArtist.Track.Views).Take(5))
                .ThenInclude(trackArtist => trackArtist.Track)
                .ThenInclude(trackArtist => trackArtist.AlbumTrack)
                .Load();

        return this;
    }
}