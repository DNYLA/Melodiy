namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;

public sealed class GetTrackQuery(string slug, int? userId, bool includeImage = true, bool includePath = false)
    : IRequest<TrackResponse>
{
    public GetTrackQuery(string slug) : this(slug, null)
    {
    }

    public GetTrackQuery() : this(string.Empty, -1, true, false)
    {
    }

    public string Slug { get; set; } = slug;

    public int? UserId { get; set; } = userId;

    public bool IncludeImage { get; set; } = includeImage;

    public bool IncludePath { get; set; } = includePath;
}