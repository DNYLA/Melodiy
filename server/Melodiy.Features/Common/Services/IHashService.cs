namespace Melodiy.Features.Common.Services;

public interface IHashService
{
    string Secure(string plaintext);

    bool ValidateSecure(string plaintext, string hash);

    string File(MemoryStream stream);
}
