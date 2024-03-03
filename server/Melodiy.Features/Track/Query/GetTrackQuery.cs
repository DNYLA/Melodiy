namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;

public sealed class GetTrackQuery : IRequest<TrackResponse>
{
    public string Slug { get; set; }

    public int? UserId { get; set; } = null;

    public bool IncludeImage { get; set; }
}