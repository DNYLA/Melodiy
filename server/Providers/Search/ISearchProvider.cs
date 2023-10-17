using melodiy.server.Dtos.Search;

namespace melodiy.server.Providers.Search
{
    public interface ISearchProvider
    {
        Task<SearchResults> Search(string term, int limit);
    }
}