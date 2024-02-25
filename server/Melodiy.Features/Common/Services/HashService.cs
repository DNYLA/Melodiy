namespace Melodiy.Features.Common.Services;

using BCrypt.Net;

using System.Security.Cryptography;

public sealed class HashService : IHashService
{
    public string Secure(string password)
    {
        return BCrypt.HashPassword(password);
    }

    public bool ValidateSecure(string password, string hash)
    {
        return BCrypt.Verify(password, hash);
    }

    public string File(MemoryStream stream)
    {
        var hash = MD5.HashData(stream.ToArray());

        return BitConverter.ToString(hash).Replace("-", "").ToLower(System.Globalization.CultureInfo.CurrentCulture);
    }
}
