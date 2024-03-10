namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Artist;

using Microsoft.Extensions.DependencyInjection;

public static class ArtistServiceExtensions
{
    public static IServiceCollection AddArtistModule(this IServiceCollection services)
    {
        services.AddScoped<IArtistRepository, ArtistRepository>();

        return services;
    }
}