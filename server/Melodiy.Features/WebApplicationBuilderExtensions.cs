namespace Melodiy.Features;

using Microsoft.Extensions.DependencyInjection;

public static class WebApplicationBuilderExtensions
{
    public static void AddFeatures(this IServiceCollection services)
    {
        services.AddControllers().AddApplicationPart(typeof(WebApplicationBuilderExtensions).Assembly);
    }
}
