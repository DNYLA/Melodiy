using melodiy.server.Dtos.Artist;

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

        public Task<ServiceResponse<GetArtistInfoResponse>> Get(string id)
        {
            throw new NotImplementedException();
        }
    }
}