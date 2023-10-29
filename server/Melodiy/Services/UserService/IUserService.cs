namespace Melodiy.Services.UserService;

public interface IUserService
{
    Task<User?> GetById(int userId);
    Task<User?> GetFullUser(string username);
    Task<User> CreateUser(string username, string pHash);
    Task<User> Update(User user);
}