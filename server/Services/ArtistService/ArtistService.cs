using melodiy.server.Dtos.Artist;
using melodiy.server.Dtos.Song;

namespace server.Services.ArtistService
{
    public class ArtistService : IArtistService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ArtistService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<ServiceResponse<GetArtistInfoResponse>> Get(string artistId)
        {
            ServiceResponse<GetArtistInfoResponse> response = new();

            try
            {
                Artist? dbArtist = await _context.Artists
                                // .Include(s => s.User)
                                .FirstOrDefaultAsync(s => s.UID == artistId);

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

                response.Data = _mapper.Map<GetArtistInfoResponse>(dbArtist);
                response.Data.MonthlyListeners = 24230012;
                response.Data.TopTracks = artistSongs.Select(_mapper.Map<GetSongResponse>).ToList();
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