﻿namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;

public sealed class GetArtistQueryHandler(IArtistRepository artistRepository)
    : IRequestHandler<GetArtistQuery, ArtistResponse?>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    public async Task<ArtistResponse?> Handle(GetArtistQuery request, CancellationToken cancellationToken)
    {
        var artist = await _artistRepository.WithImage(request.IncludeImage).GetBySlugAsync(request.Slug);

        return artist?.ToResponse();
    }
}