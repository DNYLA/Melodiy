
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.Playlist;

public interface IPlaylistService
{
    Task<PlaylistResponse> Create(IFormFile? image, int userId, string title, bool isPublic);
}