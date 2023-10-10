using System.Globalization;
using AutoMapper.Internal;
using melodiy.server.Dtos.Search;
using melodiy.server.Dtos.Song;
using SpotifyAPI.Web;

namespace melodiy.server.Providers.Search
{
    public class SpotifyProvider : ISearchProvider
    {
        public SpotifyClientConfig DefaultConfig;
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SpotifyProvider(IConfiguration configuration, DataContext context, IMapper mapper)
        {
            _configuration = configuration;
            _context = context;
            _mapper = mapper;

            string spotifyClientId = _configuration.GetSection("AppSettings:SpotifyClientId").Value ?? throw new Exception("SpotifyClientId is null!");
            string spotifyClientSecret = _configuration.GetSection("AppSettings:SpotifyClientSecret").Value ?? throw new Exception("SpotifyClientSecret is null!");
            DefaultConfig = SpotifyClientConfig.CreateDefault().WithAuthenticator(new ClientCredentialsAuthenticator(spotifyClientId, spotifyClientSecret));
        }

        public async Task<SearchResults> Search(string term, int limit)
        {
            SpotifyClient spotify = new(DefaultConfig);
            // SearchResponse results = await spotify.Search.Item(new SearchRequest(SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track, term));

            //Searches for only Artists, Albums and Tracks
            SearchResponse results = await spotify.Search.Item(new SearchRequest(SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track, term)
            {
                Type = SearchRequest.Types.Artist | SearchRequest.Types.Album | SearchRequest.Types.Track,
                Query = term,
                Limit = limit
            });


            //No Results so we can return an empty result;
            SearchResults pipedResults = new();
            if (results == null || results.Tracks == null || results.Tracks.Items == null)
            {
                return new();
            }

            List<Song> _insertSongs = new();

            //Converts Spotify API results into DB serialised Song Track.
            results.Tracks.Items.ForEach(track =>
            {
                DateTime releaseDate = GetReleaseDate(track.Album.ReleaseDate, track.Album.ReleaseDatePrecision);
                //Check if it already exists.
                // List<string> artists = track.Artists.ConvertAll(a => a.Name);

                Console.WriteLine(releaseDate);
                _ = _insertSongs.TryAdd(new Song
                {
                    Title = track.Name,
                    Artist = track.Artists[0].Name, //TODO: Update to include multiple artists ?
                    Album = track.Album.Name,
                    CoverPath = track.Album.Images[0].Url,
                    SongPath = track.PreviewUrl ?? "25", //TODO: Update to YoutubeUrl
                    Duration = track.DurationMs,
                    Provider = ProviderType.External,
                    SpotifyId = track.Id,
                    ReleaseDate = releaseDate.ToUniversalTime(),
                });
            });

            try
            {
                await _context.Songs.BulkInsertAsync(_insertSongs, options =>
                {
                    options.InsertIfNotExists = true;
                    options.ColumnPrimaryKeyExpression = s => s.SpotifyId;

                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            //Pointless as we don't care about getting the newest "createdAt" variable for searched results.
            List<Song> dbSongs = await _context.Songs.Where(s => _insertSongs.Select(i => i.SpotifyId).Contains(s.SpotifyId)).ToListAsync();
            pipedResults.Songs = dbSongs.Select(_mapper.Map<GetSongResponse>).ToList();

            return pipedResults;
        }

        //Converts YYYY-MM-DD (2004-01-01 || 2004-01)  to a DateTime Variable.
        private static DateTime GetReleaseDate(string releaseDate, string releaseDatePrecision)
        {
            //Some results are only accurate to the month or year in this case we default to the start of the period.
            if (releaseDatePrecision == "month")
            {
                releaseDate += "-01";
            }
            else if (releaseDatePrecision == "year")
            {
                releaseDate += "-01-01";
            }

            DateTime result = DateTime.ParseExact(releaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            return result;
        }
    }
}