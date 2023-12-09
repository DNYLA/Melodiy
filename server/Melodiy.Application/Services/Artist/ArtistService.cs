using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Search;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.BulkInsertService;
using Melodiy.Application.Services.TrackService;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Melodiy.Application.Services.ArtistService;

public class ArtistService : IArtistService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;
    private readonly IExternalSearchProvider _externalSearchProvider;
    private readonly IBulkInsertService _bulkInsertService;

    public ArtistService(IDataContext context, IFileRepository fileRepository, IExternalSearchProvider externalSearchProvider, IBulkInsertService bulkInsertService)
    {
        _context = context;
        _fileRepository = fileRepository;
        _externalSearchProvider = externalSearchProvider;
        _bulkInsertService = bulkInsertService;
    }

    public async Task<ArtistResponse> Create(string name, IFormFile? image, string username, int userId)
    {
        Image? uploadedImage = null;
        if (image != null)
        {
            uploadedImage = await _fileRepository.UploadImage(image, username, userId);
        }

        var artist = new Artist
        {
            Slug = Guid.NewGuid().ToString("N"),
            Name = name,
            Image = uploadedImage,
            User = _context.Users.Find(userId)!,
            Verified = false,
        };

        _context.Artists.Add(artist);
        await _context.SaveChangesAsync();

        return artist.Adapt<ArtistResponse>();
    }

    public async Task<Artist> Get(string slug, bool includeImage = false)
    {
        var artists = _context.Artists.AsQueryable();

        if (includeImage)
        {

            artists = artists.Include(artist => artist.Image);
        }
        var artist = await artists.FirstOrDefaultAsync(artist => artist.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Artist Id {slug} not found");

        return artist;
        // return artist.Adapt<ArtistResponse>();
    }

    public async Task<ArtistDetails> GetFullArtist(string slug)
    {
        var artist = await _context.Artists.Include(a => a.Image)
                                           .Include(a => a.Albums)
                                           .ThenInclude(album => album.Image)
                                           .Include(a => a.TrackArtists.OrderBy(ta => ta.Track.Views).Take(5)) //Takes Top x tracks by views
                                           .ThenInclude(ta => ta.Track)
                                           .FirstOrDefaultAsync(artist => artist.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Artist Id {slug} not found");

        if (artist.SpotifyId != null)
        {
            artist = await IndexArtist(artist);
        }

        var artistDetails = artist.Adapt<ArtistDetails>();
        artistDetails.Albums = artist.Albums.Where(album => album.Type == AlbumType.Album)
                                            .ToList()
                                            .Adapt<List<AlbumResponse>>()
                                            .OrderByDescending(a => a.ReleaseDate)
                                            .ToList();
        artistDetails.Singles = artist.Albums.Where(album => album.Type != AlbumType.Album)
                                             .ToList()
                                             .Adapt<List<AlbumResponse>>()
                                             .OrderByDescending(a => a.ReleaseDate)
                                             .ToList();
        artistDetails.TopTracks = artist.TrackArtists.Select(ta => ta.Track).ToList().Adapt<List<TrackResponse>>();

        return artistDetails;
    }

    private async Task<Artist> IndexArtist(Artist artist)
    {
        if (artist.SpotifyId == null)
        {
            throw new ApiError(HttpStatusCode.InternalServerError, "Internal server error");
        }

        //Get External Data
        var externalArtist = await _externalSearchProvider.GetArtist(artist.SpotifyId);

        //Update Image if one doesn't already exist.
        if (artist.Image == null && externalArtist.ImageUrl != null)
        {
            var existingImage = await _context.Images.FirstOrDefaultAsync(i => i.Url == externalArtist.ImageUrl);
            artist.Image = existingImage ?? new Image
            {
                Url = externalArtist.ImageUrl,
            };

            await _context.SaveChangesAsync(); //Save changes here as we don't want tracked changes to affect album inserting.
        }

        //Insert Albums we fetched (function ignores duplicates/already inserted albums)
        var albums = await _bulkInsertService.BulkInsertExternalAlbums(externalArtist.Albums);

        var totalAlbums = artist.Albums.Concat(albums).ToList(); //This can include duplicate albums between local and external data.

        //Note that we won't call _context.SaveChanges() on this as all of this data is already in the database however it's more efficient to filter
        //locally instead of refetching everything again.
        artist.Albums = totalAlbums.GroupBy(a => a.Id).Select(a => a.First()).ToList();


        return artist;
    }
}