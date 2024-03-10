namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Track.Models;

public sealed class GetUserTracksQueryHandler(ITrackRepository trackRepository)
    : IRequestHandler<GetUserTracksQuery, List<TrackResponse>>
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    public async Task<List<TrackResponse>> Handle(GetUserTracksQuery request, CancellationToken cancellationToken)
    {
        var tracks = await _trackRepository.WithUser()
                                           .WithImage()
                                           .WithArtists()
                                           .WithAlbum()
                                           .GetByUser(request.UserId);

        return  tracks.OrderBy(track => track.CreatedAt).Select(track => track.ToResponse()).ToList();
    }
}