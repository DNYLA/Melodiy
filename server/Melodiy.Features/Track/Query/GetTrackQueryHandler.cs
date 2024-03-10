namespace Melodiy.Features.Track.Query;

using MediatR;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.File;
using Melodiy.Features.Track.Entities;
using Melodiy.Features.Track.Models;
using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.Stream;

using System.Net;

public sealed class GetTrackQueryHandler(
    ITrackRepository trackRepository,
    IFileService fileService,
    IStreamProvider streamProvider)
    : IRequestHandler<GetTrackQuery, TrackResponse>
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    private readonly IFileService _fileService = fileService;

    private readonly IStreamProvider _streamProvider = streamProvider;

    public async Task<TrackResponse> Handle(GetTrackQuery request, CancellationToken cancellationToken)
    {
        var track = await _trackRepository.WithImage(request.IncludeImage)
                                          .WithAlbum()
                                          .WithArtists()
                                          .GetBySlugAsync(request.Slug);

        if (track == null || (!track.Public && track.UserId != request.UserId))
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Track {request.Slug} is not found");
        }

        if (request.IncludePath)
        {
            track.Path = await GetTrackPath(track, request.UserId);
        }

        return track.ToResponse();
    }

    private async Task<string> GetTrackPath(Track track, int? userId)
    {
        if (!track.Public && track.UserId != userId)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Track {track.Slug} is not found");
        }

        return track.Source switch
        {
            SourceType.Local => await GetTrackFromProvider(track.Path, track.Public),
            SourceType.Supabase => await GetTrackFromProvider(track.Path, track.Public),
            SourceType.Spotify => await GetTrackFromStreamProvider(track),
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    private async Task<string> GetTrackFromProvider(string? path, bool isPublic)
    {
        if (string.IsNullOrWhiteSpace(path))
        {
            throw new ApiException(HttpStatusCode.InternalServerError);
        }

        return await _fileService.GetTrackUrl(path, isPublic);
    }

    private async Task<string> GetTrackFromStreamProvider(Track track)
    {
        var externalId = GetExternalStreamId(track);

        if (string.IsNullOrWhiteSpace(externalId))
        {
            var response = await _streamProvider.GetBestMatch(track.Title,
                                                              track.TrackArtists.Select(t => t.Artist.Name).ToList(),
                                                              track.Duration);
            track.Duration = response.DurationMs != 0 ? response.DurationMs : track.Duration;
            SetExternalStreamId(track, response.Source, response.Id);
            externalId = response.Id;
        }

        return await _streamProvider.GetStream(externalId);
    }

    private string? GetExternalStreamId(Track track)
    {
        return track.YoutubeId;

        //return track.Source switch
        //{
        //    SourceType.Youtube => track.YoutubeId,
        //    _ => string.Empty
        //};
    }

    private void SetExternalStreamId(Track track, SourceType source, string externalId)
    {
        switch (source)
        {
            case SourceType.Youtube:
                track.YoutubeId = externalId;
                break;
            default:
                break;
        }
    }
}