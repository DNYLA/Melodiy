using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.User
{
    public class CreateUserRequest
    {
       	public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}