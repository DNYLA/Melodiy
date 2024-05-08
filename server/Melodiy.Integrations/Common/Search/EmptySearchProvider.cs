namespace Melodiy.Integrations.Common.Search;

using Melodiy.Integrations.Common.Search.Models;

public class EmptySearchProvider : ISearchProvider
{
    public async Task<ExternalAlbum> GetAlbum(string id)
    {
        //TODO: Fix async task issue
        return null;
    }

    public async Task<ExternalArtist> GetArtist(string id)
    {
        //TODO: Fix async task issue
        return null;
    }

    public async Task<ExternalSearchResult> Search(string term, int limit, ExternalSearchType? type)
    {
        return new ExternalSearchResult
        {
            Albums = new(),
            Artists = new(),
            Tracks = new(),
        };
    }

    public SourceType GetSourceType()
    {
        return SourceType.Local;
    }
}