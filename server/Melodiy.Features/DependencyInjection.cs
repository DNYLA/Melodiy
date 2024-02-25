namespace Melodiy.Features;

using Melodiy.Features.Common.Services;

using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddFeatures(this IServiceCollection services)
    {
        services.AddControllers().AddApplicationPart(typeof(DependencyInjection).Assembly);

        //Register Common Services below otherwise go to Melodiy.Infrastructure.Extensions
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IHashService, HashService>();

        return services;
    }
}
