using Melodiy.Application.Common.Entities;
using Melodiy.Application.Services.SearchService;

namespace Melodiy.Application.Common.Interfaces.Search;

public interface IExternalSearchProvider
{
    Task<ExternalSearchResult> Search(string term, int limit);
}