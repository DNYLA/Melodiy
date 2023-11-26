using ATL;
using Melodiy.Application.Common;
using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.PlayerService;

public interface IPlayerService
{
    Task<PlayerResponse> Play(string trackId, CollectionType type, string collectionId, int position, bool shuffle, UserClaims? claims);
    Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims);
}