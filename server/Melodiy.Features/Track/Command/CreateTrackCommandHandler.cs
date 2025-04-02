namespace Melodiy.Features.Track.Command;

using MediatR;

using Melodiy.Features.Album.Query;
using Melodiy.Features.Artist.Query;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Common.Services;
using Melodiy.Features.File;
using Melodiy.Features.Image.Models;
using Melodiy.Features.Track.Entities;
using Melodiy.Features.Track.Models;

using System.Net;

public class CreateTrackCommandHandler(
    ITrackRepository trackRepository,
    IFileService fileService,
    IDateTimeProvider dateTimeProvider,
    IMediator mediator)
    : IRequestHandler<CreateTrackCommand, TrackResponse>
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    private readonly IFileService _fileService = fileService;

    private readonly IDateTimeProvider _dateTimeProvider = dateTimeProvider;

    //TODO: Find another solution as this can be dangerous?
    private readonly IMediator _mediator = mediator;

    public async Task<TrackResponse> Handle(CreateTrackCommand request, CancellationToken cancellationToken)
    {
        var artist = await _mediator.Send(new GetArtistQuery(request.ArtistId), cancellationToken);

        if (artist == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"[Artist]: Id {request.ArtistId} not found");
        }

        var trackFile = await _fileService.UploadAudio(request.Audio, request.Public);
        var duration = (int)await _fileService.GetAudioDuration(request.Audio);
        ImageResponse? uploadedImage = null;

        if (request.Image != null)
        {
            uploadedImage = await _fileService.UploadImage(request.Image);
        }

        var trackArtist = new TrackArtist()
        {
            ArtistId = artist.Id,
        };

        Track track = new()
        {
            Title = request.Title,
            Explicit = request.Explicit,
            TrackArtists = new() { trackArtist },
            Path = trackFile.Path,
            Source = trackFile.Source,
            ImageId = uploadedImage?.Id,
            Duration = duration,
            UserId = request.UserId,
            ReleaseDate = _dateTimeProvider.UtcNow,
            Public = request.Public,
            Encrypted = request.Encrypted
        };

        if (!string.IsNullOrWhiteSpace(request.AlbumId))
        {
            var album = await _mediator.Send(new GetAlbumQuery(request.AlbumId), cancellationToken);

            if (album != null)
            {
                track.AlbumTrack = new()
                {
                    Position = 0,
                    AlbumId = album.Id,
                };
            }
        }

        await _trackRepository.SaveAsync(track);
        return track.ToResponse();
    }
}