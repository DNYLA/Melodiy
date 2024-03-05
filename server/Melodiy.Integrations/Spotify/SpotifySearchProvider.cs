namespace Melodiy.Integrations.Spotify;

using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.Search;
using Melodiy.Integrations.Common.Search.Models;

using Microsoft.Extensions.Options;

using SpotifyAPI.Web;

using System.Globalization;

internal class SpotifySearchProvider(IOptions<SpotifySettings> spotifySettings) : ISearchProvider
{
    private readonly SpotifyClientConfig _defaultConfig = SpotifyClientConfig.CreateDefault().WithAuthenticator(new ClientCredentialsAuthenticator(spotifySettings.Value.ClientId, spotifySettings.Value.ClientSecret));

    public async Task<ExternalAlbum> GetAlbum(string id)
    {
        SpotifyClient spotify = new(_defaultConfig);
        var album = await spotify.Albums.Get(id, new AlbumRequest
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


    public async Task<ExternalArtist> GetArtist(string id)
    {
        var client = new SpotifyClient(_defaultConfig);
        var artist = await client.Artists.Get(id);
        var albums = await client.Artists.GetAlbums(id, new ArtistsAlbumsRequest
        {
            IncludeGroupsParam = ArtistsAlbumsRequest.IncludeGroups.Album | ArtistsAlbumsRequest.IncludeGroups.Single,
            Market = "US",
            Limit = 50,
        });

        var allAlbums = await client.PaginateAll(albums);

        return new ExternalArtist
        {
            Id = artist.Id,
            Name = artist.Name,
            ImageUrl = artist.Images.Any() ? artist.Images[0].Url : null,
            Albums = allAlbums.Select(SpotifyAlbumToExternalAlbum).ToList(),
        };
    }

    public async Task<ExternalSearchResult> Search(string term, int limit)
    {
        var client = new SpotifyClient(_defaultConfig);
        var pipedResults = new ExternalSearchResult();
        var results = await client.Search.Item(
                          new SearchRequest(SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track, term)
                          {
                              Type = SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track,
                              Query = term,
                              Limit = limit
                          });

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

        pipedResults.Source = SourceType.Spotify;

        return pipedResults;
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

    private static ExternalTrack SpotifyAlbumTrackToExternalTrack(SimpleTrack track, ExternalAlbum album)
    {
        return new ExternalTrack
        {
            Id = track.Id,
            Position = track.TrackNumber,
            Explicit = track.Explicit,
            Artists = track.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Album = album,
            Title = track.Name,
            ImageUrl = album.ImageUrl,
            Duration = track.DurationMs,
            ReleaseDate = album.ReleaseDate
        };
    }

    private static ExternalAlbumType SpotifyAlbumTypeToAlbumType(string type, int totalTracks)
    {
        if (type == "album")
        {
            return ExternalAlbumType.Album;
        }

        return totalTracks == 1 ? ExternalAlbumType.Single : ExternalAlbumType.Ep;
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

    private static DateTime SpotifyDateToUniversalTime(string releaseDate, string precision)
    {
        switch (precision)
        {
            //Some results are only accurate to the month or year in this case we default to the start of the period.
            case "month":
                releaseDate += "-01";
                break;
            case "year":
                releaseDate += "-01-01";
                break;
        }

        return DateTime.ParseExact(releaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToUniversalTime();
    }

    private static ExternalTrack SpotifyTrackToExternalTrack(FullTrack track)
    {
        return new ExternalTrack
        {
            Id = track.Id,
            Position = track.TrackNumber,
            Explicit = track.Explicit,
            Artists = track.Artists.Select(SpotifyArtistToExternalArtist).ToList(),
            Album = SpotifyAlbumToExternalAlbum(track.Album),
            Title = track.Name,
            ImageUrl = track.Album.Images.Any() ? track.Album.Images[0].Url : null,
            Duration = track.DurationMs,
            ReleaseDate = SpotifyDateToUniversalTime(track.Album.ReleaseDate, track.Album.ReleaseDatePrecision)
        };
    }
}