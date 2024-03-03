namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;

public sealed class GetArtistQuery : IRequest<ArtistResponse?>
{
    public string Slug { get; set; } = null!;

    public bool IncludeImage { get; set; }
}