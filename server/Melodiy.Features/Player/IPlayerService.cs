namespace Melodiy.Features.Player;

using Melodiy.Features.Common.Enums;
using Melodiy.Features.Player.Enums;
using Melodiy.Features.Player.Models;
using Melodiy.Features.User.Models;

public interface IPlayerService
{
    Task<PlayerViewModel> Play(string trackSlug, CollectionType collection, string collectionId, PlayerShuffle shuffle,
                               PlayerMode mode, UserResponse? user);

    Task<PlayerViewModel> Previous(string trackId, string collectionId, CollectionType type, UserResponse user);

    Task<PlayerViewModel> Next(string trackId, string collectionId, CollectionType type, UserResponse user);

    Task<PlayerViewModel> Shuffle(string trackId, string collectionId, CollectionType collection, PlayerShuffle shuffle,
                                  UserResponse user);

    Task<PlayerViewModel> Mode(string trackId, string collectionId, CollectionType type, PlayerMode mode,
                               UserResponse user);
}