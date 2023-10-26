using Melodiy.Dtos;

namespace Melodiy.Services;

public interface IAuthService
{
    GetAuthResponse Login(string username, string password);
    GetAuthResponse Register(string username, string password);
}