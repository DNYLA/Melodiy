namespace Melodiy.Features.Playlist.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreatePlaylistRequest
{
    public string Title { get; set; } = null!;

    public int UserId { get; set; }

    public bool Public { get; set; }

    public IFormFile? Image { get; set; }
}