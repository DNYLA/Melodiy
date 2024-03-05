namespace Melodiy.Features.Search;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Search.Models;

public interface ISearchService
{
    Task<SearchResult> Search(string term, int limit = 10);

    Task<List<AlbumResponse>> SearchAlbumsCreatedByUser(string term, string artistSlug, int userId, int limit = 5);

    Task<List<ArtistResponse>> SearchArtist(string term, int limit = 5);
}