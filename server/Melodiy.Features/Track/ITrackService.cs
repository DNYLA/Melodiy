using Melodiy.Features.Track.Models;

namespace Melodiy.Features.Track;

public interface ITrackService
{
    //TODO: Move to CreateTrackCommand
    Task<TrackResponse> Create(CreateTrackRequest request, string username, int userId);

    //TODO: Move to GetTrackQuery
    Task<TrackResponse> Get(string slug, int? userId, bool includeImage = true);

    Task<List<TrackResponse>> GetUserTracks(int userId);

    Task<string> GetTrackPath(int id, int? userId);
}
