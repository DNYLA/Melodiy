
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.FileService;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.TrackService;

public class TrackService : ITrackService
{
    private readonly IDataContext _context;
    private readonly IFileService _fileService;
    private readonly IAlbumService _albumService;
    private readonly IArtistService _artistService;
    public TrackService(IDataContext context, IFileService fileService, IAlbumService albumService, IArtistService artistService)
    {
        _context = context;
        _fileService = fileService;
        _albumService = albumService;
        _artistService = artistService;
    }

    public async Task<TrackResponse> Create(UploadTrackRequest request, string username, int userId)
    {
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
            UserId = userId
        };

        _context.Tracks.Add(track);
        await _context.SaveChangesAsync();

        return track.Adapt<TrackResponse>();
    }
}