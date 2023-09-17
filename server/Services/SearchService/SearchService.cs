using melodiy.server.Dtos.Search;
using melodiy.server.Dtos.Song;
using melodiy.server.Providers.Search;
using server.Models;

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
            SearchResults spotifyRes = await _spotifyProvider.Search(term, 3);

            ServiceResponse<SearchResults> response = new()
            {
                Data = new SearchResults
                {
                    Songs = await SearchSong(term, spotifyRes.Songs)
                }
            };



            return response;
        }

        public async Task<List<GetSongResponse>> SearchSong(string songName, List<GetSongResponse> providerSongs)
        {
            try
            {
                //TODO: Sort by views in future ?
                List<Song> foundSongs = await _context.Songs.Where(s => (s.Provider == TrackProviderType.Local) && (s.Title.ToLower().Contains(songName) || s.Artist.ToLower().Contains(songName) || (s.Album != null && s.Album.ToLower().Contains(songName)))).Take(2).ToListAsync();
                List<GetSongResponse> mappedSongs = foundSongs.Select(_mapper.Map<GetSongResponse>).ToList();
                List<GetSongResponse> combinedSongs = providerSongs.Concat(mappedSongs).ToList();
                return combinedSongs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<GetSongResponse>();
            }

        }
    }
}