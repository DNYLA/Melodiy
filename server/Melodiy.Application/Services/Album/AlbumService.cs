using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Search;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.BulkInsertService;
using Melodiy.Application.Services.FileService;
using Melodiy.Application.Services.TrackService;
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
    private readonly IExternalSearchProvider _searchProvider;
    private readonly IBulkInsertService _bulkInsertService;

    public AlbumService(IDataContext context, IFileService fileService, IDateTimeProvider dateTimeProvider, IArtistService artistService, IExternalSearchProvider searchProvider, IBulkInsertService bulkInsertService)
    {
        _context = context;
        _fileService = fileService;
        _dateTimeProvider = dateTimeProvider;
        _artistService = artistService;
        _searchProvider = searchProvider;
        _bulkInsertService = bulkInsertService;
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
        var album = await albums.Include(a => a.User)
                                 .Include(a => a.Image)
                                 .Include(a => a.Artists)
                                 .Include(a => a.AlbumTracks)
                                    .ThenInclude(at => at.Track)
                                    .ThenInclude(track => track.Image)
                                 .Include(a => a.AlbumTracks)
                                    .ThenInclude(at => at.Track)
                                    .ThenInclude(track => track.TrackArtists)
                                    .ThenInclude(ta => ta.Artist)
                                 .FirstOrDefaultAsync(artist => artist.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Album Id {slug} not found");

        //Check if its an album fetched externally.
        if (album.Verified && album.ExternalSearchId != null && !album.Indexed)
        {
            var externalAlbum = await _searchProvider.GetAlbum(album.ExternalSearchId);
            var tracks = await _bulkInsertService.BulkInsertExternalTracks(externalAlbum.Tracks);
            album.Indexed = true; //No need to fetch the album tracks everytime the album is requested (Only fetch once or if an admin sets index to false)
            await _context.SaveChangesAsync();

            album.AlbumTracks = new();
            var mappedAlbum = album.Adapt<AlbumResponse>();

            //Ordering newly inserted tracks requires us to match data between external and new (internally created) tracks.
            //We could return Get() again or re-fetch the album here but it 
            mappedAlbum.Tracks = tracks.OrderBy(t => externalAlbum.Tracks.Find(externalTrack => t.ExternalSearchId == externalTrack.Id)!.Position).ToList();
            return mappedAlbum;
        }


        //Without this the Adapt<> causes an infinite loop where it maps album -> track -> album a better soloution than this is to make AlbumResponse reference an AlbumTrack value instead which doesn't include a relationship to the album.
        var tempTracks = album.AlbumTracks.OrderBy(at => at.Position).Select(at => at.Track).ToList();
        album.AlbumTracks = new();
        var responseAlbum = album.Adapt<AlbumResponse>();
        responseAlbum.Tracks = tempTracks.Adapt<List<TrackResponse>>();

        return responseAlbum;
    }
}