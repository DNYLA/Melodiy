using melodiy.server.Dtos.Album;

namespace melodiy.server.Services.AlbumService
{
    public interface IAlbumService
    {
        Task<ServiceResponse<GetFullAlbumResponse>> GetAlbum(string albumId);
    }
}