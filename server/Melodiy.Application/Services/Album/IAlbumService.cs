using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.AlbumService;

public interface IAlbumService
{
    Task<AlbumResponse> Create(string title, long timestamp, IFormFile? image, string username, int userId);
    Task<AlbumResponse> Get(string id);
}