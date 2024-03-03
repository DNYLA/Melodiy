namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Playlist;
using Melodiy.Features.Track;

using Microsoft.Extensions.DependencyInjection;

public static class TrackServiceExtensions
{
    public static IServiceCollection AddTrackModule(this IServiceCollection services)
    {
        services.AddScoped<ITrackRepository, TrackRepository>();

        return services;
    }
}