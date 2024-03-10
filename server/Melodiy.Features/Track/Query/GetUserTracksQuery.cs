namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;

public sealed class GetUserTracksQuery(int userId) : IRequest<List<TrackResponse>>
{
    public int UserId { get; set; } = userId;
}