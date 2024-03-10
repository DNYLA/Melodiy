namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Playlist;

using Microsoft.Extensions.DependencyInjection;

public static class PlaylistServiceExtensions
{
    public static IServiceCollection AddPlaylistModule(this IServiceCollection services)
    {
        services.AddScoped<IPlaylistRepository, PlaylistRepository>();
        services.AddScoped<IPlaylistService, PlaylistService>();

        return services;
    }
}