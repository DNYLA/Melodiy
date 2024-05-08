namespace Melodiy.Features.Artist.Query;

using AngleSharp.Dom;
using MediatR;

using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Search;
using Melodiy.Integrations.Common.Search;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.RateLimiting;

public sealed class SearchArtistsQueryHandler(IArtistRepository artistRepository, IExternalSearchFactory externalSearchFactory)
    : IRequestHandler<SearchArtistsQuery, List<ArtistResponse>>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    private readonly IExternalSearchFactory _externalSearchFactory = externalSearchFactory;

    public async Task<List<ArtistResponse>> Handle(SearchArtistsQuery request, CancellationToken cancellationToken)
    {
        var term = request.Term.ToLower();

        //TODO: External Search

        var searchTerms = term.Split(' ');
        var query = _artistRepository.AsQueryable();
        query = searchTerms.Aggregate(
            query, (current, curTerm) => current.Where(artist => artist.Name.ToLower().Contains(curTerm)));

        var artists = await query.OrderBy(a => a.Name).Include(a => a.Image).Take(request.Limit)
                                 .ToListAsync(cancellationToken: cancellationToken);
        var mappedArtists = artists.Select(artist => artist.ToResponse()).ToList();
        var sortedArtists = mappedArtists.Sort(artist => artist.Name, term).ToList();

        var externalSearch = await _externalSearchFactory.Search(term, ExternalSearchType.Artist, 10);

        Console.WriteLine(externalSearch.Artists.Count);
        return FilterArtists(sortedArtists, externalSearch.Artists, request.SortByVerified, request.Limit);
    }

    private List<ArtistResponse> FilterArtists(List<ArtistResponse> local, List<ArtistResponse> external, bool sortByVerified, int limit)
    {
        var localArtists = sortByVerified
                   ? local.OrderByDescending(artist => artist.Verified).ToList()
                   : local;

        external.AddRange(local);
        return external.Take(limit).DistinctBy(x => x.Id).ToList();
    }
}