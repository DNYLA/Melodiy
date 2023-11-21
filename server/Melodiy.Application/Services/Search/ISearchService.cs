using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;

namespace Melodiy.Application.Services.SearchService;

public interface ISearchService
{
    Task<SearchResult> Search(string term, int limit = 10);
    Task<List<AlbumResponse>> SearchAlbumsCreatedByUser(string term, string? artistSlug, int userId, int limit = 5);
    Task<List<ArtistResponse>> SearchArtist(string term, int limit = 5);

}