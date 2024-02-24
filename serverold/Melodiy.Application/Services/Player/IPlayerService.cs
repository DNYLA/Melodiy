using Melodiy.Application.Common;

namespace Melodiy.Application.Services.PlayerService;

public interface IPlayerService
{
    Task<PlayerResponse> Play(string trackId, CollectionType collectionType, string collectionId, PlayerType playerType, PlayerMode mode, UserClaims? claims);
    
    Task<PlayerResponse> Previous(string trackId, string collectionId, CollectionType type, UserClaims claims);
    
    Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims);
    
    Task<PlayerResponse> Shuffle(string trackId, string collectionId, CollectionType collectionType, PlayerType playerType, UserClaims claims);

    Task<PlayerResponse> Mode(string trackId, string collectionId, CollectionType type, PlayerMode mode, UserClaims claims);
}