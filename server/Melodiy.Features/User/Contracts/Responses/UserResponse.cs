using Melodiy.Features.User.Enums;

namespace Melodiy.Features.User.Contracts.Responses;

public sealed record UserResponse
{
    public required int Id { get; init; }

    public required string Username { get; init; }

    public string? Avatar { get; init; }

    public required UserRole Role { get; init; }
}
