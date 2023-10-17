using melodiy.server.Dtos.Search;
using melodiy.server.Dtos.Song;
using melodiy.server.Providers.Search;

namespace melodiy.server.Services.SearchService
{
    public class SearchService : ISearchService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ISearchProvider _spotifyProvider;

        public SearchService(DataContext context, IMapper mapper, ISearchProvider spotifyProvider)
        {
            _mapper = mapper;
            _context = context;
            _spotifyProvider = spotifyProvider;
        }

        public async Task<ServiceResponse<SearchResults>> Search(string term)
        {
            SearchResults spotifyRes = await _spotifyProvider.Search(term, 10);

            ServiceResponse<SearchResults> response = new()
            {
                Data = new SearchResults
                {
                    Songs = await SearchSong(term, spotifyRes.Songs)
                }
            };


            return response;
        }

        public async Task<List<GetSongResponse>> SearchSong(string term, List<GetSongResponse> providerSongs)
        {
            try
            {
                string[] searchTerms = term.Split(' ');

                //TODO: Sort by views in future ?
                // List<Song> localDbSongs = await _context.Songs
                // .Where(s => searchTerms.All(curTerm =>
                //     s.Title.ToLower().Contains(curTerm) ||
                //     s.Artist.ToLower().Contains(curTerm) ||
                //     (s.Album != null && s.Album.ToLower().Contains(curTerm))))
                //     .ToListAsync();
                IQueryable<Song> query = _context.Songs.AsQueryable();

                foreach (string curTerm in searchTerms)
                {
                    query = query.Where(s => s.Provider == ProviderType.Local && (s.Title.ToLower().Contains(curTerm) || s.Artist.ToLower().Contains(curTerm) || (s.Album != null && s.Album.ToLower().Contains(curTerm))));
                }

                List<Song> localDbSongs = await query.ToListAsync();
                // List<Song> localDbSongs = await _context.Songs.Where(s => (s.Provider == ProviderType.Local) && (s.Title.ToLower().Contains(term) || s.Artist.ToLower().Contains(term) || (s.Album != null && s.Album.ToLower().Contains(term)))).ToListAsync();
                List<GetSongResponse> mappedSongs = localDbSongs.Select(_mapper.Map<GetSongResponse>).ToList();
                List<GetSongResponse> combinedSongs = providerSongs.Concat(mappedSongs).ToList();
                List<GetSongResponse> sortedSongs = SortSongs(combinedSongs, term).Take(5).ToList();

                return sortedSongs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<GetSongResponse>();
            }

        }

        private static List<GetSongResponse> SortSongs(List<GetSongResponse> unorderedSongs, string searchTerm)
        {
            searchTerm = searchTerm.ToLower();
            //Multiple tracks can have the same score
            Dictionary<double, List<GetSongResponse>> trackScores = new();
            unorderedSongs.ForEach(track =>
            {
                double score = 0;
                bool isArtist = searchTerm.Contains(track.Artist.ToLower());
                bool isInTitle = searchTerm.Contains(track.Title.ToLower());
                //Add extra score for similarities
                double similarity = CalculateJaccardSimilarity(track.Title.ToLower(), searchTerm);

                if (isArtist)
                {
                    score += 1;
                }

                if (isInTitle)
                {
                    score += 2 + similarity;
                }

                //IsInTitle must be exactly the same in search term so in this case we know its most likely the best result.
                if (isInTitle && isArtist)
                {
                    score += 5;
                }

                score += similarity * 10;

                // Console.WriteLine($"{track.Title} : {score} : {similarity}");

                //Its possible two tracks can have the same score so we store a list
                if (!trackScores.ContainsKey(score))
                {
                    trackScores[score] = new List<GetSongResponse>();
                }
                trackScores[score].Add(track);
            });
            // Sort the scores in descending order
            IOrderedEnumerable<double> sortedScores = trackScores.Keys.OrderByDescending(score => score);

            // Create a list of FullTrack objects based on sorted scores
            List<GetSongResponse> sortedTracks = new();
            foreach (double score in sortedScores)
            {
                sortedTracks.AddRange(trackScores[score]);
            }

            return sortedTracks;
        }

        //Calculates a score based on how many times each words intersect in both title and string
        private static double CalculateJaccardSimilarity(string title, string term)
        {
            HashSet<string> set1 = new(title.Split(' '));
            HashSet<string> set2 = new(term.Split(' '));

            int intersection = 0;
            foreach (string item in set1)
            {
                if (set2.Contains(item))
                {
                    intersection++;
                }
            }

            int union = set1.Count + set2.Count - intersection;

            return (double)intersection / union;
        }
    }
}