using Microsoft.AspNetCore.Http;

namespace Melodiy.Features.Track.Models;

public sealed class CreateTrackRequest
{
    public IFormFile Audio { get; set; } = null!;

    public IFormFile? Image { get; set; }

    public string Title { get; set; } = null!;

    public string ArtistId { get; set; } = null!;

    public bool Public { get; set; }

    public string? AlbumId { get; set; }

    public string? AlbumArtistId { get; set; }
}