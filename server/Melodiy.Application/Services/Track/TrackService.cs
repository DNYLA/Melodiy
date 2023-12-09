
using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Enums;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.FileService;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Melodiy.Application.Services.TrackService;

public class TrackService : ITrackService
{
    private readonly IDataContext _context;
    private readonly IFileService _fileService;
    private readonly IAlbumService _albumService;
    private readonly IArtistService _artistService;
    private readonly IDateTimeProvider _dateTimeProvider;
    public TrackService(IDataContext context, IFileService fileService, IAlbumService albumService, IArtistService artistService, IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _fileService = fileService;
        _albumService = albumService;
        _artistService = artistService;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<List<TrackResponse>> BulkInsertExternal(List<ExternalTrack> data)
    {
        //Removes duplicates based on Id
        List<ExternalTrack> tracks = data.GroupBy(t => t.Id).Select(t => t.First()).ToList();

        //Fetch already existing albums
        List<string> ids = tracks.Select(a => a.Id).ToList();
        List<Track> existingTracks = _context.Tracks.Where(t => t.SpotifyId != null && ids.Contains(t.SpotifyId))
                                                    .Include(t => t.Image)
                                                    .Include(t => t.TrackArtists)
                                                    .Include(t => t.Album)
                                                    .ToList();
        List<string> existingIds = existingTracks.Select(a => a.SpotifyId!).ToList();
        List<Artist> trackArtists = await _artistService.BulkInsertExternal(tracks.SelectMany(track => track.Artists).ToList());
        List<Album> trackAlbums = await _albumService.BulkInsertExternal(tracks.Select(track => track.Album).ToList());

        List<ExternalTrack> newTracks = tracks.ExceptBy(existingIds, track => track.Id).ToList();
        var newTracksWithImages = newTracks.Select(track => new Track
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = track.Title,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            SpotifyId = track.Id,
            Image = track.Album.ImageUrl != null ? new Image
            {
                Url = track.Album.ImageUrl,
            } : null,
            TrackArtists = track.Artists.Select(externalArtist =>
            {
                var artist = trackArtists.Find(a => a.SpotifyId == externalArtist.Id)!;

                return new TrackArtist
                {
                    ArtistId = artist.Id,
                };
            }).ToList(),
            Album = trackAlbums.Find(album => album.SpotifyId == track.Album.Id),
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newTracksWithImages.Where(t => t.Image != null).Select(t => t.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var track in newTracksWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == track.Image!.Url);

            if (existingImage != null)
            {
                track.Image = existingImage;
            }
        }
        _context.Tracks.AddRange(newTracksWithImages);
        await _context.SaveChangesAsync();

        return existingTracks.Concat(newTracksWithImages).ToList().Adapt<List<TrackResponse>>();
    }

    public async Task<TrackResponse> Create(UploadTrackRequest request, string username, int userId)
    {
        if (request.ArtistId == null)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "ArtistId not provided");
        }

        var artist = await _artistService.Get(request.ArtistId);

        AlbumResponse? album = null;
        if (request.AlbumId != null)
        {
            album = await _albumService.Get(request.AlbumId);
        }

        var trackPath = await _fileService.UploadAudio(request.Audio, username, request.IsPublic);
        var duration = (int)await _fileService.GetAudioDuration(request.Audio);

        Image? uploadedImage = null;
        if (request.Image != null)
        {
            uploadedImage = await _fileService.UploadImage(request.Image, username, userId);
        }


        var trackArtist = new TrackArtist()
        {
            ArtistId = artist.Id,
        };

        Track track = new()
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = request.Title,
            TrackArtists = new() { trackArtist },
            AlbumId = album?.Id ?? null,
            FilePath = trackPath,
            Image = uploadedImage,
            Duration = duration,
            UserId = userId,
            ReleaseDate = _dateTimeProvider.UtcNow,
        };

        _context.Tracks.Add(track);
        await _context.SaveChangesAsync();

        return track.Adapt<TrackResponse>();
    }

    public async Task<List<TrackResponse>> GetUserTracks(int userId)
    {
        List<Track> tracks = await _context.Tracks
            .Include(t => t.User)
            .Include(t => t.Image)
            .Include(t => t.TrackArtists)
            .ThenInclude(t => t.Artist)
            .Include(t => t.Album)
            .Where(t => t.UserId == userId)
            .OrderBy(t => t.CreatedAt)
            .ToListAsync();

        return tracks.Adapt<List<TrackResponse>>();
    }

    public async Task<TrackResponse> Get(string slug, int? userId, bool includeImage = true)
    {
        var tracks = _context.Tracks.AsQueryable();

        if (includeImage)
        {

            tracks = tracks.Include(artist => artist.Image);
        }
        var track = await tracks
            .Include(t => t.User)
            .Include(t => t.TrackArtists)
            .ThenInclude(t => t.Artist)
            .Include(t => t.Album)
            .FirstOrDefaultAsync(track => track.Slug == slug) ?? throw new ApiError(HttpStatusCode.NotFound, $"Track Id {slug} not found");

        if (!track.IsPublic && track.UserId != userId)
        {
            throw new ApiError(HttpStatusCode.Unauthorized, $"{slug} is a private track.");
        }
        track.FilePath = await GetTrackPath(track.FilePath, track.IsPublic);

        return track.Adapt<TrackResponse>();
    }

    public async Task<string> GetTrackPath(string? path, bool isPublic)
    {
        var bucket = isPublic ? StorageBucket.TrackPublic : StorageBucket.TracksPrivate;

        if (path == null || path == string.Empty)
        {
            throw new ApiError(HttpStatusCode.InternalServerError, $"Unable to find track.");
        }

        var url = await _fileService.GetUrl(path, bucket);

        return url;
    }
}