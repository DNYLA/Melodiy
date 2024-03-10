namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;

public sealed class GetArtistQuery(string slug, bool includeImage = false) : IRequest<ArtistResponse?>
{
    public string Slug { get; set; } = slug;

    public bool IncludeImage { get; set; } = includeImage;
}