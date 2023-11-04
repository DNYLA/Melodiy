using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.Authentication;

public class AuthenticationResult
{
    //TODO: Update to map without password
    public User User { get; set; } = null!;
    public string AccessToken { get; set; } = string.Empty;
}