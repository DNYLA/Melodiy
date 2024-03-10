namespace Melodiy.Features.Album.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreateAlbumRequest
{
    public string Title { get; set; } = null!;

    public string ArtistId { get; set; } = null!;

    public long Timestamp { get; set; }

    public IFormFile? Image { get; set; }
}