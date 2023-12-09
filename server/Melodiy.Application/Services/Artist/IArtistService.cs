using Melodiy.Application.Common.Entities;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.ArtistService;

public interface IArtistService
{
    Task<ArtistResponse> Create(string name, IFormFile? image, string username, int userId);
    Task<List<Artist>> BulkInsertExternal(List<ExternalArtist> artists);
    Task<Artist> Get(string id, bool includeImage = false);
}