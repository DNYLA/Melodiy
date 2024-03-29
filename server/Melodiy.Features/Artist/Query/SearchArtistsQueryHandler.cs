﻿namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;

public sealed class SearchArtistsQueryHandler(IArtistRepository artistRepository)
    : IRequestHandler<SearchArtistsQuery, List<ArtistResponse>>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    public async Task<List<ArtistResponse>> Handle(SearchArtistsQuery request, CancellationToken cancellationToken)
    {
        var term = request.Term.ToLower();

        var searchTerms = term.Split(' ');
        var query = _artistRepository.AsQueryable();
        query = searchTerms.Aggregate(
            query, (current, curTerm) => current.Where(artist => artist.Name.ToLower().Contains(curTerm)));

        var artists = await query.OrderBy(a => a.Name).Include(a => a.Image).Take(request.Limit)
                                 .ToListAsync(cancellationToken: cancellationToken);
        var mappedArtists = artists.Select(artist => artist.ToResponse()).ToList();
        var sortedArtists = mappedArtists.Sort(artist => artist.Name, term).ToList();

        return request.SortByVerified
                   ? sortedArtists.OrderByDescending(artist => artist.Verified).ToList()
                   : sortedArtists;
    }
}