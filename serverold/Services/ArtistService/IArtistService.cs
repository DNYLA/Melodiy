using melodiy.server.Dtos.Artist;

namespace server.Services.ArtistService
{
    public interface IArtistService
    {
        Task<ServiceResponse<GetArtistInfoResponse>> Get(string id);
        // Task<ServiceResponse<string>> Index(string id);
        
    }
}