using System.Net;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.Playlist;

public class PlaylistService : IPlaylistService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;
    public PlaylistService(IDataContext context, IFileRepository fileRepository)
    {
        _context = context;
        _fileRepository = fileRepository;
    }

    public async Task<PlaylistResponse> Create(IFormFile? image, string username, int userId, string title, bool isPublic)
    {
        Image? uploadedImage = null;

        if (image != null)
        {
            uploadedImage = await _fileRepository.UploadImage(image, username, userId);
        }

        var playlist = new Domain.Entities.Playlist
        {
            Slug = Guid.NewGuid().ToString("N"), //TODO: Update to better slug generation?
            Title = title,
            Image = uploadedImage,
            User = _context.Users.Find(userId)!,
        };

        _context.Playlists.Add(playlist);
        await _context.SaveChangesAsync();

        return playlist.Adapt<PlaylistResponse>();
    }

    public async Task<List<PlaylistResponse>> GetAll(int userId)
    {
        var playlists = await _context.Playlists
            .Include(p => p.User)
            .Include(p => p.Image)
            .Where(p => p.UserId == userId)
            .ToListAsync();

        return playlists.Adapt<List<PlaylistResponse>>();
    }
}