using System.Security.Claims;

namespace melodiy.server.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {

            return int.Parse(_httpContextAccessor.HttpContext!.User //Services should call IsAuthenticated() first if they are unsure if a user is logged in
            .FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext!.User //Services should call IsAuthenticated() first if they are unsure if a user is logged in
            .FindFirstValue(ClaimTypes.Name)!;
        }

        public bool IsAuthenticated()
        {
            return _httpContextAccessor.HttpContext != null && _httpContextAccessor.HttpContext.User != null;
        }
    }
}