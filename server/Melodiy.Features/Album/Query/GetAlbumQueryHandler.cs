namespace Melodiy.Features.Album.Query;

using MediatR;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Search;
using Melodiy.Features.Track.Models;
using Melodiy.Integrations.Common;

public sealed class GetAlbumQueryHandler(IAlbumRepository albumRepository, IExternalSearchFactory externalSearchFactory)
    : IRequestHandler<GetAlbumQuery, AlbumResponse?>
{
    private readonly IAlbumRepository _albumRepository = albumRepository;

    private readonly IExternalSearchFactory _searchFactory = externalSearchFactory;

    public async Task<AlbumResponse?> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
    {
        var album = await _albumRepository.WithArtist()
                                          .WithImage(request.IncludeImage)
                                          .WithTracks()
                                          .GetBySlugAsync(request.Slug);

        if (album == null)
            return null;

        //Causes an infinite loop as album.Track[0].Album will reference the album;
        var albumResponse = album.ToResponse();
        albumResponse.Tracks = await GetAlbumTracks(album);


        return albumResponse;
    }

    private async Task<List<TrackResponse>> GetAlbumTracks(Album album)
    {
        if (album.Verified == false || album.Indexed)
        {
            return BuildTracks(album.AlbumTracks);
        }

        var externalId = GetExternalAlbumId(album);
        if (string.IsNullOrWhiteSpace(externalId))
        {
            return BuildTracks(album.AlbumTracks);
        }

        var tracks = await _searchFactory.GetAlbumTracks(externalId);

        album.Indexed = true;
        await _albumRepository.SaveAsync(album);

        return tracks;
    }

    private string? GetExternalAlbumId(Album album)
    {
        var providerSource = _searchFactory.GetSourceType();

        if (album.Verified == false || album.Indexed)
        {
            return null;
        }

        return providerSource switch
        {
            SourceType.Spotify => album.SpotifyId,
            _ => null
        };
    }

    private static List<TrackResponse> BuildTracks(IEnumerable<AlbumTrack> tracks)
    {
        return tracks.Select(albumTrack => new TrackResponse
        {
            Id = albumTrack.Track.Id,
            Slug = albumTrack.Track.Slug,
            Title = albumTrack.Track.Title,
            Views = albumTrack.Track.Views,
            Public = albumTrack.Track.Public,
            Duration = albumTrack.Track.Duration,
            ReleaseDate = albumTrack.Track.ReleaseDate,
            CreatedAt = albumTrack.Track.CreatedAt,
            Album = albumTrack.Track.AlbumTrack?.Album?.ToResponse(),
            Artists = albumTrack.Track.TrackArtists.Select(artist => artist.ToResponse()).ToList(),
            User = albumTrack.Track.User?.ToResponse(),
            Image = albumTrack.Track.Image?.ToResponse(),
            ExternalDetails = new ExternalTrackDetails()
            {
                Path = albumTrack.Track.Path,
                SpotifyId = albumTrack.Track.SpotifyId,
                YoutubeId = albumTrack.Track.YoutubeId,
                Source = albumTrack.Track.Source
            }
        }).ToList();
    }
}