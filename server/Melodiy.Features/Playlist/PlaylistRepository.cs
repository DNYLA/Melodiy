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

    public async Task<Playlist?> GetByIdAsync(string slug)
    {
        var playlist = await _playlists.FirstOrDefaultAsync(p => p.Slug == slug);

        return playlist;
    }

    public async Task<List<Playlist>> GetByUser(int userId)
    {
        return await _playlists.Where(p => p.UserId == userId).ToListAsync();
    }

    public async Task UpdateAsync(Playlist playlist)
    {
        throw new NotImplementedException();
    }

    public PlaylistRepository WithImage()
    {
        throw new NotImplementedException();
    }

    public PlaylistRepository WithTracks()
    {
        throw new NotImplementedException();
    }

    public PlaylistRepository WithUser()
    {
        _playlists.Include(p => p.User).Load();

        return this;
    }
}