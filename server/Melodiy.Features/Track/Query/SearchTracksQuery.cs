namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Track.Models;

public sealed class SearchTracksQuery(string term, int limit) : IRequest<List<TrackResponse>>
{
    public SearchTracksQuery(string term) : this(term, 5)
    {
    }

    public string Term { get; set; } = term;

    public int Limit { get; set; } = limit;
}