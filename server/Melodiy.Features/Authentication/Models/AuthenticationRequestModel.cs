namespace Melodiy.Features.Authentication.Models;

public sealed class AuthenticationRequestModel
{
    public string Username { get; set; } = null!;

    public string ClientEphemeral { get; set; } = null!;

    public string ClientProof { get; set; } = null!;

    public string SrpSession { get; set; } = null!;

    public string? UserAgent { get; set; }
}
