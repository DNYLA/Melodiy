namespace Melodiy.Services.HashService;

public interface IHashService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
}