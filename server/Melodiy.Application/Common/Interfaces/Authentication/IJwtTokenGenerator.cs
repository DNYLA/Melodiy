using Melodiy.Domain.Entities;

namespace Melodiy.Application.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}