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
        var playlist = await _playlists.FirstOrDefaultAsync(playlist => playlist.Slug == slug);

        return playlist;
    }

    public async Task<List<Playlist>> GetByUser(int userId)
    {
        return await _playlists.Where(playlist => playlist.UserId == userId).ToListAsync();
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

    public IPlaylistRepository WithImage()
    {
        _playlists.Include(playlist => playlist.Image).Load();

        return this;
    }

    public IPlaylistRepository WithTracks()
    {
        _playlists.Include(playlist => playlist.PlaylistTracks)
                  .ThenInclude(playlistTrack => playlistTrack.Track)
                  .ThenInclude(track => track.Image)
                  .Include(playlist => playlist.PlaylistTracks)
                  .ThenInclude(playlistTrack => playlistTrack.Track)
                  .ThenInclude(track => track.TrackArtists)
                  .ThenInclude(trackArtist => trackArtist.Artist)
                  .Include(playlist => playlist.PlaylistTracks)
                  .ThenInclude(playlistTrack => playlistTrack.Track)
                  .ThenInclude(track => track.AlbumTrack)
                  .ThenInclude(albumTrack => albumTrack!.Album)
                  .Load();

        return this;
    }

    public IPlaylistRepository WithUser()
    {
        _playlists.Include(playlist => playlist.User).Load();

        return this;
    }
}