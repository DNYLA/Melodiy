using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.Playlist;

public class PlaylistService : IPlaylistService
{
    private readonly IDataContext _context;

    public PlaylistService(IDataContext context)
    {
        _context = context;
    }

    public async Task<PlaylistResponse> Create(IFormFile? image, int userId, string title, bool isPublic)
    {
        //TODO: Upload Image

        var playlist = new Domain.Entities.Playlist
        {
            Slug = Guid.NewGuid().ToString("N"), //TODO: Update to better slug generation?
            Title = title,
            // Image = image,
            UserId = userId
        };

        _context.Playlists.Add(playlist);
        await _context.SaveChangesAsync();

        //TODO: Switch to automapper
        var mappedRes = new PlaylistResponse
        {
            Id = playlist.Id,
            Slug = playlist.Slug,
            Title = playlist.Title,
            UserId = playlist.UserId,
            Image = playlist.Image,
            CreatedAt = playlist.CreatedAt
        };

        return mappedRes;
    }
}