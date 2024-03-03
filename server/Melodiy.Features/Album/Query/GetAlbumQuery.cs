namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;

public sealed class GetAlbumQuery : IRequest<AlbumResponse?>
{
    public string Slug { get; set; }

    public bool IncludeImage { get; set; }
}