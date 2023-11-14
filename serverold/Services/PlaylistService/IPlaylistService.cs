using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using melodiy.server.Dtos.Playlist;
using melodiy.server.Dtos.PlaylistSong;

namespace melodiy.server.Services.PlaylistService
{
    public interface IPlaylistService
    {
        Task<ServiceResponse<GetPlaylistResponse>> CreatePlaylist(IFormFile? image, string title);
        Task<ServiceResponse<List<GetPlaylistResponse>>> GetAllPlaylists(int userId);
        Task<ServiceResponse<GetPlaylistResponse>> GetPlaylistByUID(string id);
        Task<ServiceResponse<GetPlaylistSongResponse>> AddSong(int userId, string playlistId, string trackId);
        Task<ServiceResponse<List<GetTrendingPlaylistResponse>>> GetTrending();
        Task<ServiceResponse<GetPlaylistSongResponse>> RemoveSong(int userId, string playlistId, string songId);

    }
}