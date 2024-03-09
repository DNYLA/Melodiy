namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Query;
using Melodiy.Features.Common.Extensions;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;

public sealed class SearchAlbumsQueryHandler(IAlbumRepository albumRepository, IMediator mediator)
    : IRequestHandler<SearchAlbumsQuery, List<AlbumResponse>>
{
    private readonly IAlbumRepository _albumRepository = albumRepository;

    private readonly IMediator _mediator = mediator;

    public async Task<List<AlbumResponse>> Handle(SearchAlbumsQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Term))
        {
            return new();
        }

        //TODO: Add Support for searching an album that is by an artist from term.
        var term = request.Term.ToLower();

        var searchTerms = term.Split(' ');
        var query = await GenerateQuery(searchTerms, request.ArtistSlug, request.UserId);

        var albums = await query.OrderBy(a => a.Title)
                                .Include(a => a.Image)
                                .Include(a => a.Artists)
                                .Take(request.Limit)
                                .ToListAsync(cancellationToken: cancellationToken);
        var mappedAlbums = albums.Select(album => album.ToResponse()).ToList();

        return mappedAlbums.Sort(album => album.Title, term).ToList();
    }

    private async Task<IQueryable<Album>> GenerateQuery(IEnumerable<string> terms, string? artistSlug, int? userId)
    {
        var queryable = _albumRepository.AsQueryable();
        var query = terms.Aggregate(
            queryable, (current, curTerm) => current.Where(album => album.Title.ToLower().Contains(curTerm)));

        if (!string.IsNullOrWhiteSpace(artistSlug))
        {
            query = await GetArtistQeury(artistSlug, query);
        }

        if (userId != null)
        {
            query = query.Where(album => album.UserId == userId);
        }

        return query;
    }

    private async Task<IQueryable<Album>> GetArtistQeury(string artistSlug, IQueryable<Album> query)
    {
        var artist = await _mediator.Send(new GetArtistQuery(artistSlug, true));

        return artist != null ? query.Where(album => album.Artists.Any(x => x.Id == artist.Id)) : query;
    }
}