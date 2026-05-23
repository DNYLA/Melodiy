namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.User.Services;

public static class UserServiceExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddUserServices()
        {
            // Services
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}