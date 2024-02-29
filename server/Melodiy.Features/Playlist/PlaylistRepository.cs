namespace Melodiy.Features.Playlist;

using Melodiy.Features.Common.Context;
using Melodiy.Features.Playlist.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class PlaylistRepository(MelodiyDbContext context) : IPlaylistRepository
{
    private readonly DbSet<Playlist> _playlists = context.Set<Playlist>();

    public async Task AddAsync(Playlist playlist)
    {
        playlist.Slug = Guid.NewGuid().ToString("N");
        _playlists.Add(playlist);

        await context.SaveChangesAsync();
    }

    public async Task<Playlist?> GetBySlugAsync(string slug)
    {
        var playlist = await _playlists.FirstOrDefaultAsync(p => p.Slug == slug);

        return playlist;
    }

    public async Task<List<Playlist>> GetByUser(int userId)
    {
        return await _playlists.Where(p => p.UserId == userId).ToListAsync();
    }

    public async Task SaveAsync(Playlist playlist)
    {
        if (string.IsNullOrEmpty(playlist.Slug))
        {
            playlist.Slug = Guid.NewGuid().ToString("N");
            _playlists.Add(playlist);
        }

        await context.SaveChangesAsync();
    }

    public PlaylistRepository WithImage()
    {
        _playlists.Include(p => p.Image).Load();

        return this;
    }

    public PlaylistRepository WithTracks()
    {
        _playlists.Include(p => p.PlaylistTracks)
                  .ThenInclude(pt => pt.Track)
                  .ThenInclude(track => track.Image)
                  .Include(p => p.PlaylistTracks)
                  .ThenInclude(pt => pt.Track)
                  .ThenInclude(track => track.TrackArtists)
                  .ThenInclude(ta => ta.Artist)
                  .Include(p => p.PlaylistTracks)
                  .ThenInclude(pt => pt.Track)
                  .ThenInclude(track => track.AlbumTrack)
                  .ThenInclude(at => at!.Album)
                  .Load();

        return this;
    }

    public PlaylistRepository WithUser()
    {
        _playlists.Include(p => p.User).Load();

        return this;
    }
}