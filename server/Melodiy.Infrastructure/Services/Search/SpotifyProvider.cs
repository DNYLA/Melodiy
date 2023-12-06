using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Interfaces.Search;
using Microsoft.Extensions.Options;
using SpotifyAPI.Web;

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

        if (results == null)
        {
            return pipedResults; //No Results so we can return an empty result;
        }

        // if (results.Tracks.Items != null && results.Tracks.Items.Count > 0)
        // {
        // }

        if (results.Artists.Items != null && results.Artists.Items.Count > 0)
        {
            pipedResults.Artists = ConvertArtists(results.Artists.Items);
        }

        return pipedResults;
    }

    private static List<ExternalArtist> ConvertArtists(List<FullArtist> artists)
    {
        List<ExternalArtist> converted = artists.Select(a => new ExternalArtist
        {
            Id = a.Id,
            Name = a.Name,
            ImageUrl = a.Images.Count > 0 ? a.Images[0].Url : null,
        }).ToList();

        return converted;
    }
}