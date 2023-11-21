using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.TrackService;

public class UploadTrackRequest
{
    public IFormFile Audio { get; set; } = null!;
    public IFormFile? Image { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ArtistId { get; set; } = string.Empty;
    public string? AlbumId { get; set; }
    public string? AlbumArtistId { get; set; }
}