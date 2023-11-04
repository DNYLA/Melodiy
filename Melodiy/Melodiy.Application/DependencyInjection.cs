using Melodiy.Application.Services.Authentication;
using Melodiy.Application.Services.UserService;
using Microsoft.Extensions.DependencyInjection;

namespace Melodiy.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddAplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}