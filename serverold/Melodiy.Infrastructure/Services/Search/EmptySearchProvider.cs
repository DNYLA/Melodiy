using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Interfaces.Search;

namespace Melodiy.Infrastructure.Services.Search;
public class EmptySearchProvider : IExternalSearchProvider
{
    public Task<ExternalAlbum> GetAlbum(string id)
    {
        throw new NotImplementedException(); //This shouldn't ever be called since Search() always returns Null.
    }

    public Task<ExternalFullArtist> GetArtist(string id)
    {
        throw new NotImplementedException(); //This shouldn't ever be called since Search() always returns Null.
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
