namespace Melodiy.Features;

using Melodiy.Features.Common.Services;
using Melodiy.Features.File;
using Melodiy.Features.Image;
using Melodiy.Integrations.Common;

using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddFeatures(this IServiceCollection services)
    {
        services.AddControllers().AddApplicationPart(typeof(DependencyInjection).Assembly);

        //Register Common Services below otherwise go to Melodiy.Infrastructure.Extensions
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IHashService, HashService>();

        services.AddScoped<IFileService, FileService>();

        services.AddScoped<IImageRepository, ImageRepository>();


        return services;
    }
}