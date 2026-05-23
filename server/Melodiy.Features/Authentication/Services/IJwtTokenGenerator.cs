namespace Melodiy.Features.Authentication.Services;

using Melodiy.Features.Authentication.Contracts.Responses;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(int id, string username);

    RefreshTokenResponse GenerateRefreshToken();
}