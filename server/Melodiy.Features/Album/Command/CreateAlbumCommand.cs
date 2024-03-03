namespace Melodiy.Features.Album.Command;

using MediatR;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreateAlbumCommand : IRequest<AlbumResponse>
{
    public string Title { get; set; } = null!;

    public string ArtistSlug { get; set; } = null!;

    public long Timestamp { get; set; }

    public CollectionType CollectionType { get; set; }

    public bool Verified { get; set; }

    public int UserId { get; set; }

    public IFormFile? Image { get; set; }
}