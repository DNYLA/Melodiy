
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.Playlist;

public interface IPlaylistService
{
    Task<PlaylistResponse> Create(IFormFile? image, string username, int userId, string title, bool isPublic);
}