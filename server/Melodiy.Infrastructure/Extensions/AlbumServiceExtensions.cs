namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Album;

using Microsoft.Extensions.DependencyInjection;

public static class AlbumServiceExtensions
{
    public static IServiceCollection AddAlbumModule(this IServiceCollection services)
    {
        services.AddScoped<IAlbumRepository, AlbumRepository>();

        return services;
    }
}