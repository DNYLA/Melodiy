namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;

public sealed class GetArtistDetailsQuery(string slug, bool includeImage = false) : IRequest<ArtistDetails?>
{
    public string Slug { get; set; } = slug;

    public bool IncludeImage { get; set; } = includeImage;
}