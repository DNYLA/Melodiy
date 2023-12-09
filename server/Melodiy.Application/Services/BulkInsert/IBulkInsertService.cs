using Melodiy.Application.Common.Entities;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.BulkInsertService;
public interface IBulkInsertService
{
    Task<List<Album>> BulkInsertExternalAlbums(List<ExternalAlbum> albums);
    Task<List<Artist>> BulkInsertExternalArtists(List<ExternalArtist> artists);
}
