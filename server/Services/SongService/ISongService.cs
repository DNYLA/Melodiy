using melodiy.server.Dtos.Song;

namespace melodiy.server.Services.SongService
{
    public interface ISongService
    {
        Task<ServiceResponse<GetSongResponse>> UploadSong(UploadSongRequest request);
        Task<ServiceResponse<List<GetSongResponse>>> GetUserSongs(int userId);
        Task<ServiceResponse<GetSongResponse>> GetSong(string songId);
        Task<List<GetSongResponse>> GetSongs(List<string> ids);
        Task<ServiceResponse<GetSongResponse>> DeleteSong(string songId, int userId);

    }
}