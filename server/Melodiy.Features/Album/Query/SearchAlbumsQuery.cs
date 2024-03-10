namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;

public sealed class SearchAlbumsQuery(string term, int limit, string? artistSlug, int? userId = null)
    : IRequest<List<AlbumResponse>>
{
    public SearchAlbumsQuery(string term) : this(term, 5, null)
    {
    }

    public string Term { get; set; } = term;

    public int Limit { get; set; } = limit;

    public string? ArtistSlug { get; set; } = artistSlug;

    public int? UserId { get; set; } = userId;
}