namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;

public sealed class SearchArtistsQuery(string term, int limit) : IRequest<List<ArtistResponse>>
{
    public SearchArtistsQuery(string term) : this(term, 5)
    {
    }

    public string Term { get; set; } = term;

    public int Limit { get; set; } = limit;
}