namespace Melodiy.Features.Authentication.Models;

public sealed class AuthenticationInfoResponse
{
    public string ServerEphemeral { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string SrpSession { get; set; } = null!;
}
