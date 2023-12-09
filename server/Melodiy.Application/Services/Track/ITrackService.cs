using Melodiy.Application.Common.Entities;

namespace Melodiy.Application.Services.TrackService;

public interface ITrackService
{
    Task<TrackResponse> Create(UploadTrackRequest request, string username, int userId);
    Task<List<TrackResponse>> BulkInsertExternal(List<ExternalTrack> tracks);
    Task<List<TrackResponse>> GetUserTracks(int userId);
    Task<TrackResponse> Get(string slug, int? userId, bool includeImage = true);
    Task<string> GetTrackPath(string? path, bool isPublic);
}