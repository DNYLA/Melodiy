namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;

public sealed class GetAlbumQuery(string slug, bool includeImage = true) : IRequest<AlbumResponse?>
{
    public string Slug { get; set; } = slug;

    public bool IncludeImage { get; set; } = includeImage;
}