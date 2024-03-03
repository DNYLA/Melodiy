namespace Melodiy.Features.Album.Command;

using MediatR;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Common.Services;
using Melodiy.Features.File;
using Melodiy.Features.Image.Models;

using System.Net;

public sealed class CreateAlbumCommandHandler(
    IAlbumRepository albumRepository,
    IArtistRepository artistRepository,
    IFileService fileService,
    IDateTimeProvider dateTimeProvider
) : IRequestHandler<CreateAlbumCommand, AlbumResponse>
{
    private readonly IAlbumRepository _albumRepository = albumRepository;

    private readonly IArtistRepository _artistRepository = artistRepository;

    private readonly IFileService _fileService = fileService;

    private readonly IDateTimeProvider _dateTimeProvider = dateTimeProvider;

    public async Task<AlbumResponse> Handle(CreateAlbumCommand request, CancellationToken cancellationToken)
    {
        //Since artists are a list we need the actual Artist entity to add the relationship
        //Would it be better to call ArtistService.AddToAlbum()?
        var artist = await _artistRepository.GetBySlugAsync(request.ArtistSlug);

        if (artist == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Artist Id: {request.ArtistSlug} not found");
        }

        ImageResponse? uploadedImage = null;
        if (request.Image != null)
        {
            uploadedImage = await _fileService.UploadImage(request.Image);
        }

        var album = new Album
        {
            Title = request.Title,
            Verified = request.Verified,
            ReleaseDate = _dateTimeProvider.UnixTimeStampToUtc(request.Timestamp),
            Type = request.CollectionType,
            ImageId = uploadedImage?.Id,
            UserId = request.UserId,
            Artists = new() { artist },
        };

        await _albumRepository.SaveAsync(album);

        return album.ToResponse();
    }
}