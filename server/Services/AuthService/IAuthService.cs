namespace melodiy.server.Services.AuthService
{
    public interface IAuthService
    {
        int GetUserId();
        string GetUsername();
        bool IsAuthenticated();
    }
}