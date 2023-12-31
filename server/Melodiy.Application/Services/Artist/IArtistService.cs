using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.ArtistService;

public interface IArtistService
{
    Task<ArtistResponse> Create(string name, IFormFile? image, string username, int userId);
    Task<Artist> Get(string id, bool includeImage = false);
    Task<ArtistDetails> GetFullArtist(string id);
}