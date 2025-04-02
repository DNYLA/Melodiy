namespace Melodiy.Features.Authentication.Models;

public class CreateKeyRequestModel
{
    public required string PublicKey { get; set; }

    public required string PrivateKey { get; set; }

    public required string Salt { get; set; }
}