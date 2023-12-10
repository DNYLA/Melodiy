using Melodiy.Application.Common;

namespace Melodiy.Application.Services.PlayerService;

public interface IPlayerService
{
    Task<PlayerResponse> Play(string trackId, int position, CollectionType type, string collectionId, bool shuffle, UserClaims? claims);
    Task<PlayerResponse> Previous(string trackId, string collectionId, CollectionType type, UserClaims claims);
    Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims);
}