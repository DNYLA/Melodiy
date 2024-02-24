using Melodiy.Domain.Enums;

namespace Melodiy.Application.Common.Entities;

public class ExternalArtist
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? ImageUrl { get; set; }
}