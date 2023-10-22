using melodiy.server.Dtos.Album;
using melodiy.server.Dtos.Artist;
using melodiy.server.Dtos.Song;
using melodiy.server.Providers.Search;

namespace server.Services.ArtistService
{
    public class ArtistService : IArtistService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ISearchProvider _searchProvider;

        public ArtistService(DataContext context, IMapper mapper, ISearchProvider searchProvider)
        {
            _context = context;
            _mapper = mapper;
            _searchProvider = searchProvider;
        }

        public async Task<ServiceResponse<GetArtistInfoResponse>> Get(string artistId)
        {
            ServiceResponse<GetArtistInfoResponse> response = new();

            try
            {
                Artist? dbArtist = await _context.Artists
                                .Include(a => a.Releases)
                                .ThenInclude(release => release.Artists)
                                .FirstOrDefaultAsync(s => s.UID == artistId);
                
                if (dbArtist != null && dbArtist.UpdatedAt == null && dbArtist.SpotifyId != null)
                {
                    await _searchProvider.IndexArtist(dbArtist.SpotifyId);

                    dbArtist = await _context.Artists
                                .Include(a => a.Releases)
                                .FirstOrDefaultAsync(s => s.UID == artistId);
                }

                if (dbArtist == null)
                {
                    response.Success = false;
                    response.StatusCode = 404;
                    response.Message = $"Artist not found.";
                    return response;
                }



                //TODO: Update once songs are reworked
                // Currently songs arent attached to an artist(s) or have view counter once this is done change below to use artist ID
                List<Song> artistSongs = await _context.Songs.Where(s => s.Artist.ToLower() == dbArtist.Name.ToLower()).Take(5).ToListAsync();

                List<Album> albums = new(); 
                List<Album> singles = new();

                dbArtist.Releases.ForEach(release => {
                    if (release.Type == AlbumType.Album)
                    {
                        albums.Add(release);
                    } else
                    {
                        singles.Add(release);
                    }
                }); 
                
                //Sort by Release Date
                albums = albums.OrderByDescending(a => a.ReleaseDate).ToList();
                singles = singles.OrderByDescending(a => a.ReleaseDate).ToList();

                response.Data = _mapper.Map<GetArtistInfoResponse>(dbArtist);
                response.Data.MonthlyListeners = 24230012;
                response.Data.TopTracks = artistSongs.Select(_mapper.Map<GetSongResponse>).ToList();
                response.Data.Albums = albums.Select(_mapper.Map<GetAlbumInfoResponse>).ToList();
                response.Data.Singles = singles.Select(_mapper.Map<GetAlbumInfoResponse>).ToList();
            } catch (Exception ex)
            {
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}