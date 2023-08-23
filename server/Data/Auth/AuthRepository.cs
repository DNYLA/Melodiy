using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace melodiy.server.Data.Auth
{
    public class AuthRepository : IAuthRepository
    {
    	private readonly DataContext _context;
    	private readonly IConfiguration _configuration;
		public AuthRepository(DataContext context, IConfiguration configuration)
		{
      		_configuration = configuration;
      		_context = context;
		}

		public async Task<ServiceResponse<GetAuthResponse>> Login(string username, string password)
		{
			var response = new ServiceResponse<GetAuthResponse>();
			var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower().Equals(username.ToLower()));

			if (user == null || !VerifyPasswordHash(password, user.Password, user.Salt))
			{
				response.Success = false;
				response.StatusCode = 401;
				response.Message = "Username or Password incorrect.";
			}
			else
			{
				response.Data = new GetAuthResponse 
				{
					Id = user.Id,
					Username = username,
					AccessToken =  CreateToken(user)
				};
			}

			return response;
		}

		public async Task<ServiceResponse<int>> Register(User user, string password)
		{
			var response = new ServiceResponse<int>();
			if (await this.UserExists(user.Username))
			{
				response.Success = false;
				response.StatusCode = 409;
				response.Message = "Username already exists.";
				return response;
			}

			CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

			user.Password = passwordHash;
			user.Salt = passwordSalt;

			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			response.Data = user.Id;

			return response;
		}

		public async Task<bool> UserExists(string username)
		{
			if (await _context.Users.AnyAsync(c => c.Username.ToLower() == username.ToLower())) 
			{
				return true;
			}
			return false;
		}

		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] salt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return computedHash.SequenceEqual(passwordHash);
			}
		}

		private string CreateToken(User user) 
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.Username)
			};

			var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
			if (appSettingsToken == null)
				throw new Exception("AppSettings Token is null!");

			SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

			SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(7),
				SigningCredentials = creds
			};

			JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
			
			return tokenHandler.WriteToken(token);
		}
    }

}