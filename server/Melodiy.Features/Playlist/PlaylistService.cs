namespace Melodiy.Features.Playlist;

using MediatR;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.File;
using Melodiy.Features.Image.Models;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Features.Track.Query;
using Melodiy.Features.User;

using System.Net;

public sealed class PlaylistService(
    IPlaylistRepository playlistRepository,
    IUserRepository userRepository,
    IFileService fileService,
    IMediator mediator)
    : IPlaylistService
{
    private readonly IPlaylistRepository _playlistRepository = playlistRepository;

    private readonly IUserRepository _userRepository = userRepository;

    private readonly IFileService _fileService = fileService;

    private readonly IMediator _mediator = mediator;

    public async Task<PlaylistResponse> Create(CreatePlaylistRequest request)
    {
        ImageResponse? image = null;

        if (request.Image != null)
        {
            image = await _fileService.UploadImage(request.Image);
        }

        var playlist = new Playlist
        {
            Title = request.Title,
            Public = request.Public,
            UserId = request.UserId,
            ImageId = image?.Id
        };

        await _playlistRepository.SaveAsync(playlist);

        var res = playlist.ToResponse();
        res.Image = image;

        return res;
    }

    public async Task<PlaylistResponse> Get(string slug, int? userId)
    {
        var playlist = await _playlistRepository.WithUser()
                                                .WithImage()
                                                .WithTracks()
                                                .GetBySlugAsync(slug);

        if (playlist == null || (!playlist.Public && playlist.UserId != userId))
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Playlist Id {slug} not found");
        }

        var response = playlist.ToResponse();

        response.Tracks = playlist.PlaylistTracks
                                  .Where(playlistTrack => playlistTrack.Track != null)
                                  .Select(playlistTrack =>
                                  {
                                      var convertedTrack = playlistTrack.Track!.ToResponse();
                                      convertedTrack.CreatedAt = playlistTrack.CreatedAt;

                                      return convertedTrack;
                                  })
                                  .ToList();

        response.Tracks.Sort((x, y) => DateTime.Compare(x.CreatedAt, y.CreatedAt));

        return response;
    }

    public async Task<List<PlaylistResponse>> GetAll(int userId, bool includePrivate, int limit = 0)
    {
        var playlists = await _playlistRepository.WithUser()
                                                 .WithImage()
                                                 .GetByUser(userId, includePrivate, limit);

        return playlists.Select(playlist => playlist.ToResponse()).ToList();
    }

    public async Task<List<PlaylistResponse>> GetLatest(int limit = 0)
    {
        var playlists = await _playlistRepository.WithUser()
                                                 .WithImage()
                                                 .GetLatest(limit);

        return playlists.Select(playlist => playlist.ToResponse()).ToList();
    }

    public async Task<TrackResponse> AddTrack(string slug, string trackId, int userId)
    {
        var playlist = await _playlistRepository.GetBySlugAsync(slug);
        var track = await _mediator.Send(new GetTrackQuery
        {
            Slug = trackId,
            UserId = userId,
            IncludeImage = true
        });

        if (playlist == null || playlist.UserId != userId)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Playlist Id {slug} not found");
        }

        //TODO: Handle track positions
        await _playlistRepository.AddTrack(playlist.Id, track.Id);

        return track;
    }

    public async Task<TrackResponse> RemoveTrack(string slug, string trackId, int userId)
    {
        //TODO: Remove from position

        var playlist = await _playlistRepository.WithTrack(trackId).GetBySlugAsync(slug);
        var track = await _mediator.Send(new GetTrackQuery
        {
            Slug = trackId,
            UserId = userId,
            IncludeImage = true
        });

        if (playlist == null || playlist.UserId != userId)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Playlist Id {slug} not found");
        }

        if (!playlist.PlaylistTracks.Any())
        {
            return track;
        }

        await _playlistRepository.RemoveTrack(playlist.PlaylistTracks[0]);

        return track;
    }
}