namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Track.Models;

using Microsoft.EntityFrameworkCore;

public sealed class SearchTracksQueryHandler(ITrackRepository trackRepository)
    : IRequestHandler<SearchTracksQuery, List<TrackResponse>>
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    public async Task<List<TrackResponse>> Handle(SearchTracksQuery request, CancellationToken cancellationToken)
    {
        //TODO: Add Support for searching a track that is based off an album or artist term. e.g Drake will return a list of tracks with drake in the Album.Title, Artist.Name, Track.Title. (Track.Title should be preffered and weighted higher if its an exact match).
        var term = request.Term.ToLower();

        var searchTerms = term.Split(' ');
        var query = _trackRepository.AsQueryable();
        query = searchTerms.Aggregate(
            query, (current, curTerm) => current.Where(track => track.Title.ToLower().Contains(curTerm)));

        var tracks = await query.OrderBy(t => t.Title)
                                .Include(t => t.Image)
                                .Include(t => t.AlbumTrack)
#nullable disable
                                .ThenInclude(ta => ta.Album)
                                .Include(t => t.TrackArtists)
                                .ThenInclude(ta => ta.Artist)
                                .Take(request.Limit)
                                .ToListAsync(cancellationToken: cancellationToken);
        var mappedTracks = tracks.Select(track => track.ToResponse()).ToList();

        return mappedTracks.Sort(track => track.Title, term).ToList();
    }
}