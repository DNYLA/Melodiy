using Melodiy.Application.Services.TrackService;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.Playlist;

public interface IPlaylistService
{
    Task<TrackResponse> AddTrack(string playlistId, string trackId, int userId);
    Task<TrackResponse> RemoveTrack(string playlistId, string trackId, int userId);
    Task<PlaylistResponse> Create(IFormFile? image, string username, int userId, string title, bool isPublic);
    Task<PlaylistResponse> Get(string slug, int? userId);
    Task<List<PlaylistResponse>> GetAll(int userId);
}