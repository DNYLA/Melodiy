namespace Melodiy.Features.User.Mappers;

using Melodiy.Features.User.Contracts.Responses;
using Melodiy.Features.User.Entities;

using Riok.Mapperly.Abstractions;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public static partial class UserMapper
{
    /// <summary>
/// Map a <see cref="UserEntity"/> to a <see cref="UserResponse"/>.
/// </summary>
/// <param name="user">The source <see cref="UserEntity"/> to map.</param>
/// <returns>A <see cref="UserResponse"/> representing the provided user.</returns>
public static partial UserResponse ToUserResponse(UserEntity user);
}