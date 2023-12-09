using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.FileService;
using Melodiy.Application.Services.TrackService;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Melodiy.Application.Services.Playlist;

public class PlaylistService : IPlaylistService
{
    private readonly IDataContext _context;
    private readonly IFileService _fileService;
    public PlaylistService(IDataContext context, IFileService fileService)
    {
        _context = context;
        _fileService = fileService;
    }

    public async Task<PlaylistResponse> Create(IFormFile? image, string username, int userId, string title, bool isPublic)
    {
        Image? uploadedImage = null;

        if (image != null)
        {
            uploadedImage = await _fileService.UploadImage(image, username, userId);
        }

        var playlist = new Domain.Entities.Playlist
        {
            Slug = Guid.NewGuid().ToString("N"), //TODO: Update to better slug generation?
            Title = title,
            Image = uploadedImage,
            User = _context.Users.Find(userId)!,
            IsPublic = isPublic
        };

        _context.Playlists.Add(playlist);
        await _context.SaveChangesAsync();

        return playlist.Adapt<PlaylistResponse>();
    }

    public async Task<PlaylistResponse> Get(string slug, int? userId)
    {
        var playlist = await _context.Playlists
                .Include(p => p.User)
                .Include(p => p.Image)
                .Include(p => p.PlaylistTracks)
                .ThenInclude(pt => pt.Track)
                .ThenInclude(track => track.TrackArtists)
                .ThenInclude(ta => ta.Artist)
                .FirstOrDefaultAsync(p => p.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Playlist Id {slug} not found");

        if (!playlist.IsPublic && playlist.UserId != userId)
        {
            throw new ApiError(HttpStatusCode.Unauthorized, $"Playlist Id {slug} not found");
        }
        var mappedPlaylist = playlist.Adapt<PlaylistResponse>();
        mappedPlaylist.Tracks = playlist.PlaylistTracks.Select(pt => pt.Track.Adapt<TrackResponse>()).ToList();

        return mappedPlaylist;
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