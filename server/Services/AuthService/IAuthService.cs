using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Services.AuthService
{
    public interface IAuthService
    {
        int GetUserId();
        bool IsAuthenticated();
    }
}