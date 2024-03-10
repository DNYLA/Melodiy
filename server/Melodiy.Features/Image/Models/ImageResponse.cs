namespace Melodiy.Features.Image.Models;

using Melodiy.Integrations.Common;

public sealed class ImageResponse
{
    public int Id { get; set; }

    public string Url { get; set; } = null!;

    public string? Path { get; set; }

    public SourceType Source { get; set; }

    public int? UserId { get; set; }
}