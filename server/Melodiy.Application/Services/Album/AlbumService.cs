
using Melodiy.Application.Common.Entities;
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

    public async Task<List<Album>> BulkInsertExternal(List<ExternalAlbum> data)
    {
        //Removes duplicates based on Id
        List<ExternalAlbum> albums = data.GroupBy(a => a.Id).Select(a => a.First()).ToList();

        //Fetch already existing albums
        List<string> ids = albums.Select(a => a.Id).ToList();
        List<Album> existingAlbums = _context.Albums.Where(a => a.SpotifyId != null && ids.Contains(a.SpotifyId))
                                                    .Include(a => a.Image)
                                                    .Include(a => a.Artists)
                                                    .ToList();
        List<string> existingIds = existingAlbums.Select(a => a.SpotifyId!).ToList();
        List<Artist> albumArtists = await _artistService.BulkInsertExternal(albums.SelectMany(album => album.Artists).ToList());

        List<ExternalAlbum> newAlbums = albums.ExceptBy(existingIds, album => album.Id).ToList();
        var newAlbumsWithImages = newAlbums.Select(album => new Album
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = album.Title,
            Image = album.ImageUrl != null ? new Image
            {
                Url = album.ImageUrl,
            } : null,
            Artists = album.Artists.Select(externalArtist => albumArtists.Find(a => a.SpotifyId == externalArtist.Id)!).ToList(), //Will Automatically relate but won't return related data
            ReleaseDate = album.ReleaseDate,
            Type = album.Type,
            Verified = true,
            SpotifyId = album.Id,
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newAlbumsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var album in newAlbumsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == album.Image!.Url);

            if (existingImage != null)
            {
                album.Image = existingImage;
            }
        }
        _context.Albums.AddRange(newAlbumsWithImages);
        await _context.SaveChangesAsync();

        return existingAlbums.Concat(newAlbumsWithImages).ToList();
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