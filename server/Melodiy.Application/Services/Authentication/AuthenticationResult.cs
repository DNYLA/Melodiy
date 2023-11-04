using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationResult
{
    public User User { get; set; } = null!;
    public string AccessToken { get; set; } = string.Empty;
}