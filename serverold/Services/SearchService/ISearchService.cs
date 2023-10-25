using melodiy.server.Dtos.Search;
using melodiy.server.Dtos.Song;

namespace melodiy.server.Services.SearchService
{
    public interface ISearchService
    {
        Task<ServiceResponse<SearchResults>> Search(string term);

        Task<List<GetSongResponse>> SearchSong(string term, List<GetSongResponse> providerSongs);
    }
}