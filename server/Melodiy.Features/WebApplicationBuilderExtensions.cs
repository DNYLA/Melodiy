namespace Melodiy.Features;

using Microsoft.Extensions.DependencyInjection;

public static class WebApplicationBuilderExtensions
{
    public static IServiceCollection AddFeatures(this IServiceCollection services)
    {
        services.AddControllers().AddApplicationPart(typeof(WebApplicationBuilderExtensions).Assembly);

        return services;
    }
}
