namespace Melodiy.Application.Common.Interfaces.Services;

public interface IHashService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
    string HashFile(MemoryStream stream);
}