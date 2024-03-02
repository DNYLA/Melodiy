namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;

internal class GetArtistQueryHandler(IArtistRepository artistRepository)
    : IRequestHandler<GetArtistQuery, ArtistResponse>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    public async Task<ArtistResponse> Handle(GetArtistQuery request, CancellationToken cancellationToken)
    {
        var repository = _artistRepository;

        if (request.IncludeImage)
        {
            repository = repository.WithImage();
        }

        var artist = await repository.GetBySlugAsync(request.Slug);

        return artist.ConvertToResponse();
    }
}