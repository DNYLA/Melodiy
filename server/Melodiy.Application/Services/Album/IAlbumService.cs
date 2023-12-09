using Melodiy.Application.Common.Entities;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.AlbumService;

public interface IAlbumService
{
    Task<AlbumResponse> Create(string title, string artistId, long timestamp, IFormFile? image, string username, int userId);
    Task<List<Album>> BulkInsertExternal(List<ExternalAlbum> albums);
    Task<AlbumResponse> Get(string slug, bool includeImage = false);
}