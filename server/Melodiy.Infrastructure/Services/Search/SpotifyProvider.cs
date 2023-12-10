using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Search;
using Melodiy.Domain.Enums;
using Microsoft.Extensions.Options;
using SpotifyAPI.Web;
using System.Globalization;
using System.Net;

namespace Melodiy.Infrastructure.Services.Search;

public class SpotifyProvider : IExternalSearchProvider
{
    private readonly SpotifyClientConfig _defaultConfig;

    public SpotifyProvider(IOptions<SpotifySettings> spotifySettings)
    {
        _defaultConfig = SpotifyClientConfig.CreateDefault().WithAuthenticator(new ClientCredentialsAuthenticator(spotifySettings.Value.ClientId, spotifySettings.Value.ClientSecret));
    }

    public async Task<ExternalSearchResult> Search(string term, int limit)
    {
        SpotifyClient spotify = new(_defaultConfig);

        //Searches for only Artists, Albums and Tracks
        SearchResponse results = await spotify.Search.Item(new SearchRequest(SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track, term)
        {
            Type = SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track,
            Query = term,
            Limit = limit
        });

        ExternalSearchResult pipedResults = new();

        if (results.Tracks.Items != null && results.Tracks.Items.Any())
        {
            pipedResults.Tracks = results.Tracks.Items.Select(SpotifyTrackToExternalTrack).ToList();
        }

        if (results.Artists.Items != null && results.Artists.Items.Any())
        {
            pipedResults.Artists = results.Artists.Items.Select(SpotifyArtistToExternalArtist).ToList();
        }

        if (results.Albums.Items != null && results.Albums.Items.Any())
        {
            pipedResults.Albums = results.Albums.Items.Select(SpotifyAlbumToExternalAlbum).ToList();
        }

        return pipedResults;
    }
    public async Task<ExternalAlbum> GetAlbum(string id)
    {
        SpotifyClient spotify = new(_defaultConfig);
        FullAlbum album = await spotify.Albums.Get(id, new AlbumRequest
        {
            Market = "US",
        });

        var externalAlbum = new ExternalAlbum
        {
            Id = album.Id,
            Artists = album.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Title = album.Name,
            ImageUrl = album.Images.Any() ? album.Images[0].Url : null,
            ReleaseDate = SpotifyDateToUniversalTime(album.ReleaseDate, album.ReleaseDatePrecision),
            Type = SpotifyAlbumTypeToAlbumType(album.AlbumType, album.TotalTracks),
        };
        externalAlbum.Tracks = album.Tracks.Items?.Select(track => SpotifyAlbumTrackToExternalTrack(track, externalAlbum)).ToList() ?? new();

        return externalAlbum;
    }

    public async Task<ExternalFullArtist> GetArtist(string id)
    {
        SpotifyClient spotify = new(_defaultConfig);

        FullArtist artist = await spotify.Artists.Get(id) ?? throw new ApiError(HttpStatusCode.InternalServerError, "Server error occured");
        Paging<SimpleAlbum> albums = await spotify.Artists.GetAlbums(id, new ArtistsAlbumsRequest
        {
            IncludeGroupsParam = ArtistsAlbumsRequest.IncludeGroups.Album | ArtistsAlbumsRequest.IncludeGroups.Single,
            Market = "US",
            Limit = 50,
        });

        IList<SimpleAlbum> allAlbums = await spotify.PaginateAll(albums);

        return new ExternalFullArtist
        {
            Id = artist.Id,
            Name = artist.Name,
            ImageUrl = artist.Images.Any() ? artist.Images[0].Url : null,
            Albums = allAlbums.Select(SpotifyAlbumToExternalAlbum).ToList(),
        };
    }

    private static ExternalAlbum SpotifyAlbumToExternalAlbum(SimpleAlbum album)
    {
        return new ExternalAlbum
        {
            Id = album.Id,
            Artists = album.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Title = album.Name,
            ImageUrl = album.Images.Any() ? album.Images[0].Url : null,
            ReleaseDate = SpotifyDateToUniversalTime(album.ReleaseDate, album.ReleaseDatePrecision),
            Type = SpotifyAlbumTypeToAlbumType(album.AlbumType, album.TotalTracks),
        };
    }

    private static ExternalArtist SpotifyArtistToExternalArtist(SimpleArtist artist)
    {
        return new ExternalArtist
        {
            Id = artist.Id,
            Name = artist.Name,
            ImageUrl = null,
        };
    }

    private static ExternalArtist SpotifyArtistToExternalArtist(FullArtist artist)
    {
        return new ExternalArtist
        {
            Id = artist.Id,
            Name = artist.Name,
            ImageUrl = artist.Images.Any() ? artist.Images[0].Url : null,
        };
    }

    private static ExternalTrack SpotifyTrackToExternalTrack(FullTrack track)
    {
        return new ExternalTrack
        {
            Id = track.Id,
            Artists = track.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Album = SpotifyAlbumToExternalAlbum(track.Album),
            Title = track.Name,
            ImageUrl = track.Album.Images.Any() ? track.Album.Images[0].Url : null,
            Duration = track.DurationMs,
            ReleaseDate = SpotifyDateToUniversalTime(track.Album.ReleaseDate, track.Album.ReleaseDatePrecision)
        };
    }

    private static ExternalTrack SpotifyAlbumTrackToExternalTrack(SimpleTrack track, ExternalAlbum album)
    {
        return new ExternalTrack
        {
            Id = track.Id,
            Artists = track.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Album = album,
            Title = track.Name,
            ImageUrl = album.ImageUrl,
            Duration = track.DurationMs,
            ReleaseDate = album.ReleaseDate
        };
    }

    private static AlbumType SpotifyAlbumTypeToAlbumType(string type, int totalTracks)
    {
        //Albums are always albums
        if (type == "album")
        {
            return AlbumType.Album;
        }

        //Singles can considered EP's if there are multiple traks
        if (totalTracks > 1)
        {
            return AlbumType.EP;
        }

        return AlbumType.Single; //Default anything else to a single
    }

    private static DateTime SpotifyDateToUniversalTime(string releaseDate, string precision)
    {
        //Some results are only accurate to the month or year in this case we default to the start of the period.
        if (precision == "month")
        {
            releaseDate += "-01";
        }
        else if (precision == "year")
        {
            releaseDate += "-01-01";
        }
        DateTime result = DateTime.ParseExact(releaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToUniversalTime();
        return result;
    }
}