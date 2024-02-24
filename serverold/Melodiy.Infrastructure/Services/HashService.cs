using System.Security.Cryptography;
using Melodiy.Application.Common.Interfaces.Services;

namespace Melodiy.Infrastructure.Services;

public class HashService : IHashService
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }

    public string HashFile(MemoryStream stream)
    {
        byte[] hash = MD5.HashData(stream.ToArray());
        return BitConverter.ToString(hash).Replace("-", "").ToLower(System.Globalization.CultureInfo.CurrentCulture);
    }
}