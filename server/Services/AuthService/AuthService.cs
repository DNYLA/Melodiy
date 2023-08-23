using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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

		public bool IsAuthenticated()
		{
			if (_httpContextAccessor.HttpContext == null || _httpContextAccessor.HttpContext.User == null)
				return false;

			return true;
		}
	}
}