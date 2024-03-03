namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Common.Extensions;

public sealed class GetAlbumQueryHandler(IAlbumRepository albumRepository)
    : IRequestHandler<GetAlbumQuery, AlbumResponse?>
{
    private readonly IAlbumRepository _albumRepository = albumRepository;

    public async Task<AlbumResponse?> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
    {
        var album = await _albumRepository.WithImage(request.IncludeImage)
                                          .WithArtist()
                                          .GetBySlugAsync(request.Slug);

        return album?.ToResponse();
    }
}