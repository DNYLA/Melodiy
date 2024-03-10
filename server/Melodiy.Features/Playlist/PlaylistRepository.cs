namespace Melodiy.Features.Playlist;

using Melodiy.Features.Common.Context;
using Melodiy.Features.Playlist.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class PlaylistRepository(MelodiyDbContext context) : IPlaylistRepository
{
    private readonly DbSet<Playlist> _playlists = context.Set<Playlist>();

    private readonly DbSet<PlaylistTrack> _playlistTracks = context.Set<PlaylistTrack>();

    public async Task AddTrack(int playlistId, int trackId)
    {
        _playlistTracks.Add(new PlaylistTrack
        {
            PlaylistId = playlistId,
            TrackId = trackId
        });

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

    public async Task RemoveTrack(PlaylistTrack track)
    {
        _playlistTracks.Remove(track);
        await context.SaveChangesAsync();
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

    public IPlaylistRepository WithTrack(string slug)
    {
        _playlists.Include(playlist => playlist.PlaylistTracks.Where(playlistTrack => playlistTrack.Track.Slug == slug))
                  .Load();

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
                  #nullable disable
                  .ThenInclude(albumTrack => albumTrack.Album)
                  .Load();

        return this;
    }

    public IPlaylistRepository WithUser()
    {
        _playlists.Include(playlist => playlist.User).Load();

        return this;
    }
}