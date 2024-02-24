namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.User;

using Microsoft.Extensions.DependencyInjection;

public static class UserServiceExtensions
{
    public static IServiceCollection AddUserModule(this IServiceCollection services)
    {
        //services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}
