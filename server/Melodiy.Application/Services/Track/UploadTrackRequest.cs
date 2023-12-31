using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.TrackService;

public class UploadTrackRequest
{
    public IFormFile Audio { get; set; } = null!;
    public IFormFile? Image { get; set; }
    public string Title { get; set; } = null!;
    public string? ArtistId { get; set; } = null!;
    public bool IsPublic { get; set; } = true;
    public string? AlbumId { get; set; }
    public string? AlbumArtistId { get; set; }
}