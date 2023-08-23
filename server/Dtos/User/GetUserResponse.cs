using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.User
{
    public class GetUserResponse
    {
        public int Id { get; set; }
		public string Username { get; set; } = string.Empty;
    }
}