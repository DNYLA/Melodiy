namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Player;

using Microsoft.Extensions.DependencyInjection;

public static class PlayerServiceExtensions
{
    public static IServiceCollection AddPlayerModule(this IServiceCollection services)
    {
        services.AddScoped<IPlayerService, PlayerService>();

        return services;
    }
}