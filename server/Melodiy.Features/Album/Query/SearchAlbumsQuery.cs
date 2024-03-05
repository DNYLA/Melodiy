namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;

public sealed class SearchAlbumsQuery(string term, int limit) : IRequest<List<AlbumResponse>>
{
    public SearchAlbumsQuery(string term) : this(term, 5)
    {
    }

    public string Term { get; set; } = term;

    public int Limit { get; set; } = limit;
}