namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.User.Services;

public static class UserServiceExtensions
{
    /// <summary>
    /// Registers user-related services into the dependency injection container.
    /// </summary>
    /// <param name="services">The service collection to add registrations to.</param>
    /// <returns>The same <see cref="IServiceCollection"/> instance after registering user services.</returns>
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