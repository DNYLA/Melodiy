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
        private readonly IAudioProvider _audioProvider;

        public SpotifyProvider(IConfiguration configuration, DataContext context, IMapper mapper, IAudioProvider audioProvider)
        {
            _configuration = configuration;
            _context = context;
            _mapper = mapper;
            _audioProvider = audioProvider;

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
            List<string> spotifyIds = new(); //List of all songs fetched regardless if they have already exist.

            //Converts Spotify API results into DB serialised Song Track.
            for (int i = 0; i < results.Tracks.Items.Count; i++)
            {
                FullTrack track = results.Tracks.Items[i];
                DateTime releaseDate = GetReleaseDate(track.Album.ReleaseDate, track.Album.ReleaseDatePrecision);

                //Check if it already exists.
                //TODO: Filter out list before instead of individually checking (Less DB calls)
                Song? dbSong = await _context.Songs.SingleOrDefaultAsync(s => s.SpotifyId == track.Id);
                if (dbSong != null)
                {
                    spotifyIds.Add(track.Id);
                    continue;
                }


                List<string> artists = track.Artists.ConvertAll(a => a.Name);
                try
                {
                    //To Make searches quicker and reduce uneeded API calls the audio stream is fetched whenever the individual song
                    //is requested (usually when it is played by a user).
                    //This will throw an error if no video is found
                    // YoutubeVideo video = await _audioProvider.Find(track.Name, artists, track.DurationMs);
                    // _ = TimeSpan.TryParseExact(video.Duration, @"m\:ss", null, out TimeSpan videoDuration);

                    Console.WriteLine(releaseDate);
                    _ = _insertSongs.TryAdd(new Song
                    {
                        Title = track.Name,
                        Artist = track.Artists[0].Name, //TODO: Update to include multiple artists ?
                        Album = track.Album.Name,
                        CoverPath = track.Album.Images[0].Url,
                        Duration = track.DurationMs,
                        Provider = ProviderType.External,
                        SpotifyId = track.Id,
                        // YoutubeId = video.Id,
                        ReleaseDate = releaseDate.ToUniversalTime(),
                    });
                    spotifyIds.Add(track.Id);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

            }

            try
            {
                await _context.Songs.BulkInsertAsync(_insertSongs, options =>
                {
                    options.InsertIfNotExists = true;
                    // options.index
                    options.ColumnPrimaryKeyExpression = s => s.SpotifyId;
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            //Pointless as we don't care about getting the newest "createdAt" variable for searched results.
            List<Song> dbSongs = await _context.Songs.Where(s => spotifyIds.Contains(s.SpotifyId!)).ToListAsync();
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