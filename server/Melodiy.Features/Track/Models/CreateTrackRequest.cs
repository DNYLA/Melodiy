namespace Melodiy.Features.Track.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreateTrackRequest
{
    public IFormFile Audio { get; set; }

    public IFormFile? Image { get; set; }

    public string Title { get; set; }

    public string? ArtistName { get; set; }

    public string? ArtistId { get; set; }

    public bool Public { get; set; }

    public string? AlbumTitle { get; set; }

    public string? AlbumId { get; set; }

    public string? AlbumArtistId { get; set; }
}