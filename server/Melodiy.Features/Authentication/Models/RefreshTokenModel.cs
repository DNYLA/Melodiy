namespace Melodiy.Features.Authentication.Models;

public sealed class RefreshTokenModel
{
    public string Token { get; set; }

    public DateTime Expires { get; set; }
}
