namespace Melodiy.Integrations.Common.Search;

using Melodiy.Integrations.Common.Search.Models;

public class EmptySearchProvider : ISearchProvider
{
    public async Task<ExternalAlbum> GetAlbum(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<ExternalArtist> GetArtist(string id)
    {
        throw new NotImplementedException();
    }


    public async Task<ExternalSearchResult> Search(string term, int limit)
    {
        return new ExternalSearchResult
        {
            Albums = new(),
            Artists = new(),
            Tracks = new(),
        };
    }
}