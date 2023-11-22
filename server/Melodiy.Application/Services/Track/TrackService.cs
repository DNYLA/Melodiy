
using System.Net;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.FileService;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

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

        Console.WriteLine(tracks[0].Title);
        Console.WriteLine(tracks[0].TrackArtists[0].Artist.Name);

        return tracks.Adapt<List<TrackResponse>>();
    }
}