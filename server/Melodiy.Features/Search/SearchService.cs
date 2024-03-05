namespace Melodiy.Features.Search;

using MediatR;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Album.Query;
using Melodiy.Features.Artist.Models;
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
        //This will insert into DB and will be fetched if they are in the results.
        await _externalSearchFactory.Search(term, limit);

        return new SearchResult
        {
            Albums = await _mediator.Send(new SearchAlbumsQuery(term)),
            Artists = await _mediator.Send(new SearchArtistsQuery(term)),
            Tracks = await _mediator.Send(new SearchTracksQuery(term)),
        };
    }

    public async Task<List<AlbumResponse>> SearchAlbumsCreatedByUser(string term, string artistSlug, int userId,
                                                                     int limit = 5)
    {
        throw new NotImplementedException();
    }

    public async Task<List<ArtistResponse>> SearchArtist(string term, int limit = 5)
    {
        throw new NotImplementedException();
    }
}