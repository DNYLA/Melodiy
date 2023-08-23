using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Services.UserService
{
	public class UserService : IUserService
	{
    	private readonly DataContext _context;
    	private readonly IMapper _mapper;
		public UserService(IMapper mapper, DataContext context)
		{
      		_mapper = mapper;
			_context = context;
		}
		public async Task<ServiceResponse<GetUserResponse>> GetUserById(int id)
		{
			var response = new ServiceResponse<GetUserResponse>();

			var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
			response.Data = _mapper.Map<GetUserResponse>(user);

			return response;
		}
	}
}