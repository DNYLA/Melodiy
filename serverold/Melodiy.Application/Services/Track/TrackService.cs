using Melodiy.Application.Common.Enums;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Search;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.BulkInsertService;
using Melodiy.Application.Services.FileService;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
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
    private readonly IBulkInsertService _bulkInsertService;
    private readonly IExternalStreamProvider _externalStreamProvider;
    public TrackService(IDataContext context, IFileService fileService, IAlbumService albumService, IArtistService artistService, IDateTimeProvider dateTimeProvider, IBulkInsertService bulkInsertService, IExternalStreamProvider externalStreamProvider)
    {
        _context = context;
        _fileService = fileService;
        _albumService = albumService;
        _artistService = artistService;
        _dateTimeProvider = dateTimeProvider;
        _bulkInsertService = bulkInsertService;
        _externalStreamProvider = externalStreamProvider;
    }

    public async Task<TrackResponse> Create(UploadTrackRequest request, string username, int userId)
    {
        if (request.ArtistId == null)
        {
            throw new ApiError(HttpStatusCode.BadRequest, "ArtistId not provided");
        }

        var artist = await _artistService.Get(request.ArtistId);
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
            FilePath = trackPath,
            Image = uploadedImage,
            Duration = duration,
            UserId = userId,
            ReleaseDate = _dateTimeProvider.UtcNow,
            IsPublic = true,
        };

        if (request.AlbumId != null)
        {
            var album = await _albumService.Get(request.AlbumId);
            track.AlbumTrack = new()
            {
                Position = 0,
                AlbumId = album.Id,
            };
        }

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
            .Include(t => t.AlbumTrack)
#nullable disable
                .ThenInclude(at => at.Album)
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
            .Include(t => t.AlbumTrack)
            .ThenInclude(at => at.Album)
            .FirstOrDefaultAsync(track => track.Slug == slug) ?? throw new ApiError(HttpStatusCode.NotFound, $"Track Id {slug} not found");

        if (!track.IsPublic && track.UserId != userId)
        {
            throw new ApiError(HttpStatusCode.Unauthorized, $"{slug} is a private track.");
        }

        return track.Adapt<TrackResponse>();
    }

    public async Task<string> GetTrackPath(int id, int? userId)
    {
        var track = await _context.Tracks.Include(t => t.TrackArtists)
                                            .ThenInclude(ta => ta.Artist)
                                         .Include(t => t.AlbumTrack)
                                            .ThenInclude(at => at.Album)
                                         .FirstOrDefaultAsync(t => t.Id == id) ?? throw new ApiError(HttpStatusCode.NotFound, $"Track Id not found");

        if (!track.IsPublic && track.UserId != userId)
        {
            throw new ApiError(HttpStatusCode.Unauthorized, $"{track.Slug} is a private track.");
        }

        if (track.Source == SourceType.Local)
        {
            var bucket = track.IsPublic ? StorageBucket.TrackPublic : StorageBucket.TracksPrivate;

            if (track.FilePath == null || track.FilePath == string.Empty)
            {
                throw new ApiError(HttpStatusCode.InternalServerError, $"Unable to find track.");
            }

            var url = await _fileService.GetUrl(track.FilePath, bucket);

            return url;
        }

        if (track.ExternalStreamId == null)
        {

            try
            {
                var response = await _externalStreamProvider.GetBestMatch(track.Title, track.TrackArtists.Select(t => t.Artist.Name).ToList(), track.Duration);

                track.ExternalStreamId = response.Id;
                track.Duration = response.DurationMs != 0 ? response.DurationMs : track.Duration;
                await _context.SaveChangesAsync();
            }
            catch (ApiError)
            {
                //TODO: Delete/make track invisible as its invalid
                throw new ApiError(HttpStatusCode.InternalServerError, "Interal Server error occured");
            }
        }

        //This is outside try catch as it is possible youtube videos get deleted/privated in which case we would want to refetch GetBestMatch() instead of deleting the track.
        return await _externalStreamProvider.GetStream(track.ExternalStreamId);
    }
}