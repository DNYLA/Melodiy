using melodiy.server.Dtos.Search;
using melodiy.server.Dtos.Song;

namespace melodiy.server.Services.SearchService
{
    public class SearchService : ISearchService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SearchService(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<SearchResults>> Search(string term)
        {
            ServiceResponse<SearchResults> response = new()
            {
                Data = new SearchResults
                {
                    Songs = await SearchSong(term)
                }
            };



            return response;
        }

        public async Task<List<GetSongResponse>> SearchSong(string songName)
        {
            try
            {
                List<Song> foundSongs = await _context.Songs.Where(s => s.Title.ToLower().Contains(songName) || s.Artist.ToLower().Contains(songName) || (s.Album != null && s.Album.ToLower().Contains(songName))).ToListAsync();
                List<GetSongResponse> mappedSongs = foundSongs.Select(_mapper.Map<GetSongResponse>).ToList();

                Console.WriteLine(foundSongs.Count);

                return mappedSongs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<GetSongResponse>();
            }

        }
    }
}