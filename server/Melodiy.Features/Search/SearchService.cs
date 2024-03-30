namespace Melodiy.Features.Search;

using MediatR;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Album.Query;
using Melodiy.Features.Artist.Query;
using Melodiy.Features.Search.Models;
using Melodiy.Features.Track.Query;

using System.Collections.Generic;

public sealed class SearchService(
    IExternalSearchFactory externalSearchFactory,
    IMediator mediator) : ISearchService
{
    private readonly IExternalSearchFactory _externalSearchFactory = externalSearchFactory;

    private readonly IMediator _mediator = mediator;

    public async Task<SearchResult> Search(string term, int limit = 10)
    {
        var externalResults = await _externalSearchFactory.Search(term, limit);

        var allResults = new SearchResult
        {
            Albums = await _mediator.Send(new SearchAlbumsQuery(term)),
            Artists = await _mediator.Send(new SearchArtistsQuery(term)),
            Tracks = await _mediator.Send(new SearchTracksQuery(term)),
        };

        //Local search algorithm currently isn't as good as spotify so if we search for Drake it will return songs only
        //with the titles that include Drake not songs made by Drake resulting in significantly fewer results that are accurate.
        //TODO: Remove once local search algorithm is better
        return CombineResults(allResults, externalResults, limit);
    }

    public async Task<List<AlbumResponse>> SearchAlbumsCreatedByUser(string term, string artistSlug, int userId,
                                                                     int limit = 5)
    {
        throw new NotImplementedException();
    }

    private static SearchResult CombineResults(SearchResult localSearch, SearchResult externalSearch, int limit)
    {
        localSearch.Albums.AddRange(externalSearch.Albums);
        localSearch.Artists.AddRange(externalSearch.Artists);
        localSearch.Tracks.AddRange(externalSearch.Tracks);

        return new SearchResult
        {
            Albums = localSearch.Albums.Take(limit).DistinctBy(x => x.Id).ToList(),
            Artists = localSearch.Artists.Take(limit).DistinctBy(x => x.Id).ToList(),
            Tracks = localSearch.Tracks.Take(limit).DistinctBy(x => x.Id).ToList()
        };
    }
}