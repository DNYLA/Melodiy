using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.FileService;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.AlbumService;

public class AlbumService : IAlbumService
{
    private readonly IDataContext _context;
    private readonly IFileService _fileService;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IArtistService _artistService;

    public AlbumService(IDataContext context, IFileService fileService, IDateTimeProvider dateTimeProvider, IArtistService artistService)
    {
        _context = context;
        _fileService = fileService;
        _dateTimeProvider = dateTimeProvider;
        _artistService = artistService;
    }

    public async Task<AlbumResponse> Create(string title, string artistId, long timestamp, IFormFile? image, string username, int userId)
    {
        Artist? artist = null;
        artist = await _artistService.Get(artistId);

        Image? uploadedImage = null;
        if (image != null)
        {
            uploadedImage = await _fileService.UploadImage(image, username, userId);
        }

        var utcReleaseTime = _dateTimeProvider.UnixTimeStampToUtc(timestamp);



        var album = new Album
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = title,
            Verified = false,
            ReleaseDate = utcReleaseTime,
            Type = AlbumType.Album,
            Image = uploadedImage,
            // User = _context.Users.Find(userId)!,
            Artists = new() { artist },
            UserId = userId,
        };



        _context.Albums.Add(album);
        await _context.SaveChangesAsync();

        return album.Adapt<AlbumResponse>();
    }

    public async Task<AlbumResponse> Get(string slug, bool includeImage = false)
    {
        var albums = _context.Albums.AsQueryable();

        if (includeImage)
        {

            albums = albums.Include(album => album.Image);
        }
        var artist = await albums.FirstOrDefaultAsync(artist => artist.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Album Id {slug} not found");

        return artist.Adapt<AlbumResponse>();
    }
}