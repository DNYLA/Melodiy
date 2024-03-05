namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;

using System.Collections.Generic;

using Melodiy.Features.Common.Extensions;

using Microsoft.EntityFrameworkCore;

public sealed class SearchAlbumsQueryHandler(IAlbumRepository albumRepository)
    : IRequestHandler<SearchAlbumsQuery, List<AlbumResponse>>
{
    private readonly IAlbumRepository _albumRepository = albumRepository;

    public async Task<List<AlbumResponse>> Handle(SearchAlbumsQuery request, CancellationToken cancellationToken)
    {
        //TODO: Add Support for searching an album that is by an artist from term.
        var term = request.Term.ToLower();

        var searchTerms = term.Split(' ');
        var query = _albumRepository.AsQueryable();
        query = searchTerms.Aggregate(query, (current, curTerm) => current.Where(album => album.Title.ToLower().Contains(curTerm)));

        var albums = await query.OrderBy(a => a.Title)
                                .Include(a => a.Image)
                                .Include(a => a.Artists)
                                .Take(request.Limit)
                                .ToListAsync(cancellationToken: cancellationToken);
        var mappedAlbums = albums.Select(album => album.ToResponse()).ToList();

        return mappedAlbums.Sort(album => album.Title, term).ToList();
    }
}