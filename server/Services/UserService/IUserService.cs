using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<GetUserResponse>> GetUserById(int id);
    }
}