
using Melodiy.Application.Common.Interfaces.Persistance;

namespace Melodiy.Application.Services.TrackService;

public class TrackService : ITrackService
{
    private readonly IDataContext _context;

    public TrackService(IDataContext context)
    {
        _context = context;
    }


    public Task<TrackResponse> UploadSong(UploadTrackRequest request, int userId)
    {
        throw new NotImplementedException();
    }
}