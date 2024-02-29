namespace Melodiy.Integrations.Common;

public interface IHashService
{
    string Secure(string plaintext);

    bool ValidateSecure(string plaintext, string hash);

    string File(MemoryStream stream);
}
