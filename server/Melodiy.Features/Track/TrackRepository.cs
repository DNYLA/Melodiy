namespace Melodiy.Features.Track;

using Melodiy.Features.Common.Context;
using Melodiy.Features.Track.Entities;

using Microsoft.EntityFrameworkCore;

public class TrackRepository(MelodiyDbContext context) : ITrackRepository
{
    private readonly DbSet<Track> _tracks = context.Set<Track>();

    public async Task<Track?> GetByIdAsync(int id)
    {
        return await _tracks.FindAsync(id);
    }

    public async Task<Track?> GetBySlugAsync(string slug)
    {
        return await _tracks.FirstOrDefaultAsync(track => track.Slug == slug);
    }

    public async Task<List<Track>> GetByUser(int userId)
    {
        return await _tracks.Where(track => track.UserId == userId).ToListAsync();
    }

    public async Task SaveAsync(Track track)
    {
        if (string.IsNullOrEmpty(track.Slug))
        {
            track.Slug = Guid.NewGuid().ToString("N");
            _tracks.Add(track);
        }

        await context.SaveChangesAsync();
    }

    public ITrackRepository WithAlbum()
    {
        _tracks.Include(playlist => playlist.AlbumTrack)
               .ThenInclude(albumTrack => albumTrack!.Album)
               .Load();

        return this;
    }

    public ITrackRepository WithArtists()
    {
        _tracks.Include(p => p.TrackArtists)
               .ThenInclude(trackArtist => trackArtist.Artist)
               .Load();

        return this;
    }

    public ITrackRepository WithImage()
    {
        _tracks.Include(p => p.Image).Load();

        return this;
    }

    public ITrackRepository WithUser()
    {
        _tracks.Include(p => p.User).Load();

        return this;
    }
}