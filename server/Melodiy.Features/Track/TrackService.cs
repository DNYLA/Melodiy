namespace Melodiy.Features.Track;

using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Track.Models;

using System.Net;

using Melodiy.Features.Common.Exceptions;

public sealed class TrackService(ITrackRepository trackRepository) : ITrackService
{
    private readonly ITrackRepository _trackRepository = trackRepository;

    public async Task<TrackResponse> Create(CreateTrackRequest request, string username, int userId)
    {
        //TODO: Implement once other services are completed.

        throw new NotImplementedException();
    }

    public async Task<TrackResponse> Get(string slug, int? userId, bool includeImage = true)
    {
        //TODO: Implement once other services are completed.

        throw new NotImplementedException();
    }

    public async Task<List<TrackResponse>> GetUserTracks(int userId)
    {
        var tracks = await _trackRepository.WithUser()
                                           .WithImage()
                                           .WithAlbum()
                                           .WithArtists()
                                           .GetByUser(userId);

        var orderedTracks = tracks.OrderBy(track => track.CreatedAt);

        return orderedTracks.Select(track => new TrackResponse
        {
            Id = track.Id,
            Slug = track.Slug,
            Title = track.Title,
            Views = track.Views,
            Public = track.Public,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            CreatedAt = track.CreatedAt,
            ExternalDetails = new ExternalTrackDetails
            {
                Path = track.Path,
                SpotifyId = track.SpotifyId,
                YoutubeId = track.YoutubeId,
                Source = track.Source
            },
            //Artists = track.TrackArtists,
            //Album = track.CollectionTrack,
            User = track.User.ToResponse(),
            Image = track.Image.ToResponse()
        }).ToList();
    }

    public async Task<string> GetTrackPath(int id, int? userId)
    {
        var track = await _trackRepository.WithArtists().WithAlbum().GetByIdAsync(id);

        if (track == null || (track.Public && track.UserId != userId))
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Track Id not found");
        }

        //TODO: Finish once other integrations are done

        throw new NotImplementedException();
    }
}