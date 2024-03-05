namespace Melodiy.Integrations.Common.Search;

using Melodiy.Integrations.Common.Search.Models;

public interface ISearchProvider
{
    Task<ExternalAlbum> GetAlbum(string id);

    Task<ExternalArtist> GetArtist(string id);

    Task<ExternalSearchResult> Search(string term, int limit);
}