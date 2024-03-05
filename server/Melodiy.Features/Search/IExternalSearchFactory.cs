namespace Melodiy.Features.Search;

using Melodiy.Features.Search.Models;

public interface IExternalSearchFactory
{
    Task<SearchResult> Search(string term, int limit = 10);
}