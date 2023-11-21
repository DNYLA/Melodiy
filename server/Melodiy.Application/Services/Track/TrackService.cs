
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;

namespace Melodiy.Application.Services.TrackService;

public class TrackService : ITrackService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;
    private readonly IAlbumService _albumService;
    private readonly IArtistService _artistService;
    public TrackService(IDataContext context, IFileRepository fileRepository, IAlbumService albumService, IArtistService artistService)
    {
        _context = context;
        _fileRepository = fileRepository;
        _albumService = albumService;
        _artistService = artistService;
    }

    public Task<TrackResponse> UploadSong(UploadTrackRequest request, string username, int userId)
    {
        throw new NotImplementedException();
    }


    // public async Task<TrackResponse> UploadSong(UploadTrackRequest request, string username, int userId)
    // {
    //     var artist = _artistService.Get(request.ArtistId);
    //     var trackPath = await _fileRepository.UploadTrack(request.Audio, username, request.IsPublic);

    // }
}