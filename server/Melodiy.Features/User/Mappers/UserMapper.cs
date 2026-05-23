namespace Melodiy.Features.User.Mappers;

using Melodiy.Features.User.Contracts.Responses;
using Melodiy.Features.User.Entities;

using Riok.Mapperly.Abstractions;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public static partial class UserMapper
{
    public static partial UserResponse ToUserResponse(UserEntity user);
}