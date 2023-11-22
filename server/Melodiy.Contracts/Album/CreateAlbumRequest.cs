using Microsoft.AspNetCore.Http;

namespace Melodiy.Contracts.Album;

public class CreateAlbumRequest
{
    public string Title { get; set; } = null!;
    public string ArtistId { get; set; } = null!;
    public long Timestamp { get; set; }
    public IFormFile? Image { get; set; }
}