namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;
using System.Net;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;

public sealed class GetTrackQueryHandler(ITrackRepository trackRepository)
    : IRequestHandler<GetTrackQuery, TrackResponse>
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    public async Task<TrackResponse> Handle(GetTrackQuery request, CancellationToken cancellationToken)
    {
        var track = await _trackRepository.WithImage(request.IncludeImage)
                                          .WithAlbum()
                                          .WithArtists()
                                          .GetBySlugAsync(request.Slug);

        if (track == null || (!track.Public && track.UserId != request.UserId))
        {
            throw new ApiException(HttpStatusCode.NotFound, $"[Track] {request.Slug} is not found");
        }

        return track.ToResponse();
    }
}