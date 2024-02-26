namespace Melodiy.Features.Playlist;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Features.User;

using System.Net;

public sealed class PlaylistService(IPlaylistRepository playlistRepository, IUserRepository userRepository)
    : IPlaylistService
{
    private readonly IPlaylistRepository _playlistRepository = playlistRepository;

    private readonly IUserRepository _userRepository = userRepository;

    public async Task<PlaylistResponse> Create(CreatePlaylistRequest request)
    {
        //TODO: Add Image Uploading

        //TODO: Does this need to be here?
        var user = await _userRepository.GetByIdAsync(request.UserId);

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        var playlist = new Playlist
        {
            Title = request.Title,
            Public = request.Public,
            UserId = request.UserId
        };

        await _playlistRepository.AddAsync(playlist);

        return new PlaylistResponse
        {
            Id = playlist.Id,
            Slug = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            Tracks = new(),
            UserId = request.UserId,
            //Image = playlist.Image,
            //Image = playlist.Image,
            CreatedAt = playlist.CreatedAt
        };
    }

    public async Task<PlaylistResponse> Get(string slug, int? userId)
    {
        //TODO: Update Once Track & PlaylistTrack is done

        var playlist = await _playlistRepository.WithUser()
                                                .GetByIdAsync(slug);

        if (playlist == null || (!playlist.Public && playlist.UserId != userId))
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Playlist Id {slug} not found");
        }

        return new PlaylistResponse
        {
            Id = playlist.Id,
            Slug = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            Tracks = new(),
            UserId = playlist.UserId,
            //Image = playlist.Image,
            //Image = playlist.Image,
            CreatedAt = playlist.CreatedAt
        };
    }

    public async Task<List<PlaylistResponse>> GetAll(int userId)
    {
        var playlists = await _playlistRepository.WithUser()
                                                 //.WithImage()
                                                 .GetByUser(userId);

        return playlists.Select(playlist => new PlaylistResponse
        {
            Id = playlist.Id,
            Slug = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            UserId = playlist.UserId,
            //Image = playlist.Image,
            //Image = playlist.Image,
            CreatedAt = playlist.CreatedAt
        }).ToList();
    }

    public async Task<TrackResponse> AddTrack(string id, string trackId, int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<TrackResponse> RemoveTrack(string id, string trackId, int userId)
    {
        throw new NotImplementedException();
    }
}