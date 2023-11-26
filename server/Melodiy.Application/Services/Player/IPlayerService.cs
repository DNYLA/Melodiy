using ATL;
using Melodiy.Application.Common;
using Melodiy.Application.Services.TrackService;

namespace Melodiy.Application.Services.PlayerService;

public interface IPlayerService
{
    Task<PlayerResponse> Play(int position, CollectionType type, string collectionId, bool shuffle, UserClaims? claims);
    Task<PlayerResponse> Previous(string collectionId, CollectionType type, UserClaims claims);
    Task<PlayerResponse> Next(string collectionId, CollectionType type, UserClaims claims);
}