using melodiy.server.Dtos.Album;
using melodiy.server.Providers.Search;
using melodiy.server.Services.AlbumService;

namespace server.Services.AlbumService
{
    public class AlbumService : IAlbumService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ISearchProvider _searchProvider;

        public AlbumService(DataContext context, IMapper mapper, ISearchProvider searchProvider)
        {
            _context = context;
            _mapper = mapper;
            _searchProvider = searchProvider;
        }
        public async Task<ServiceResponse<GetFullAlbumResponse>> GetAlbum(string albumId)
        {
            ServiceResponse<GetFullAlbumResponse> response = new();

            try
            {
                Album? dbAlbum = await _context.Albums
                .Include(a => a.Tracks)
                .Include(a => a.Artists)
                .FirstOrDefaultAsync(s => s.UID == albumId);

                if (dbAlbum != null && dbAlbum.UpdatedAt == null && dbAlbum.SpotifyId != null && dbAlbum.Verified)
                {
                    Console.WriteLine("Fetching Album Data");
                    dbAlbum = await _searchProvider.FetchAlbum(dbAlbum.SpotifyId);
                }
                Console.WriteLine("Here Outsider");
                if (dbAlbum == null)
                {
                    response.Success = false;
                    response.StatusCode = 404;
                    response.Message = $"Album not found.";
                    return response;
                }
                
                dbAlbum.Tracks = dbAlbum.Tracks.OrderBy(a => a.Position).ToList();
                // Console.WriteLine()
                response.Data = _mapper.Map<GetFullAlbumResponse>(dbAlbum);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.Success = false;
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}