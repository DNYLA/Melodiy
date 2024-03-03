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
        _tracks.Include(track => track.AlbumTrack)
               .ThenInclude(albumTrack => albumTrack!.Album)
               .Load();

        return this;
    }

    public ITrackRepository WithArtists()
    {
        _tracks.Include(track => track.TrackArtists)
               .ThenInclude(trackArtist => trackArtist.Artist)
               .Load();

        return this;
    }

    public ITrackRepository WithImage(bool include = true)
    {
        if (!include)
        {
            return this;
        }

        _tracks.Include(track => track.Image).Load();

        return this;
    }

    public ITrackRepository WithUser()
    {
        _tracks.Include(track => track.User).Load();

        return this;
    }
}