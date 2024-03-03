namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;

public sealed class GetUserTracksQuery : IRequest<List<TrackResponse>>
{
    public int UserId { get; set; }
}