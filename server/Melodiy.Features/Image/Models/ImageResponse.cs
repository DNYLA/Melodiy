namespace Melodiy.Features.Image.Models;

using Melodiy.Features.Image.Entities;

public sealed class ImageResponse
{
    public int Id { get; set; }

    public string Url { get; set; } = null!;

    public string? Path { get; set; }

    public ImageSource Source { get; set; }
    
    public int? UserId { get; set; }
}