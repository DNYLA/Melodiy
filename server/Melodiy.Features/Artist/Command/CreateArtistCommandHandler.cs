namespace Melodiy.Features.Artist.Command;

using MediatR;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.File;
using Melodiy.Features.Image.Models;

public sealed class CreateArtistCommandHandler(IArtistRepository artistRepository, IFileService fileService)
    : IRequestHandler<CreateArtistCommand, ArtistResponse>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    private readonly IFileService _fileService = fileService;

    public async Task<ArtistResponse> Handle(CreateArtistCommand request, CancellationToken cancellationToken)
    {
        ImageResponse? uploadedImage = null;

        if (request.Image != null)
        {
            uploadedImage = await _fileService.UploadImage(request.Image);
        }

        var artist = new Artist
        {
            Name = request.Name,
            ImageId = uploadedImage?.Id,
            UserId = request.UserId,
            Verified = false
        };

        await _artistRepository.SaveAsync(artist);

        return artist.ConvertToResponse();
    }
}