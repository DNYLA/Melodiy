namespace Melodiy.Application.Services.TrackService;

public interface ITrackService
{
    Task<TrackResponse> Create(UploadTrackRequest request, string username, int userId);
    Task<List<TrackResponse>> GetUserTracks(int userId);
}