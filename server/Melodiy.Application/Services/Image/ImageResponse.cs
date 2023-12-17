using Melodiy.Domain.Enums;

namespace Melodiy.Application.Services.ImageService;

public class ImageResponse
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? Path { get; set; } //The path where the local file was uploaded to. e.g Dan/image.png
    public SourceType Source { get; set; }
    public int? UserId { get; set; }
}