using Melodiy.Features.Profile;

namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.User;

using Microsoft.Extensions.DependencyInjection;

//TODO: Refactor whole Infrastructure project to use one main file per extensions e.g. one for internal services, one for external services and individual ones for db connections. 
public static class UserServiceExtensions
{
    public static IServiceCollection AddUserModule(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IProfileService, ProfileService>();

        return services;
    }
}