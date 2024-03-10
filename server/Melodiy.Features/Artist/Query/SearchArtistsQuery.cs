namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;

public sealed class SearchArtistsQuery(string term, int limit, bool sortByVerified) : IRequest<List<ArtistResponse>>
{
    public SearchArtistsQuery(string term) : this(term, 5, false)
    {
    }

    public string Term { get; set; } = term;

    public int Limit { get; set; } = limit;

    public bool SortByVerified { get; set; } = sortByVerified;
}