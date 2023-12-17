using Melodiy.Application.Common.Entities;

namespace Melodiy.Application.Common.Interfaces.Search;

public interface IExternalSearchProvider
{
    Task<ExternalSearchResult> Search(string term, int limit);
    Task<ExternalFullArtist> GetArtist(string id);
    Task<ExternalAlbum> GetAlbum(string id);
}