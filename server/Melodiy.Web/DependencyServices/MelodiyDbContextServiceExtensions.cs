namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.Common.Data;

using Microsoft.EntityFrameworkCore;

public static class MelodiyDbContextServiceExtensions
{
    /// <summary>
    /// Adds and configures MelodiyDbContext to the service collection using the PostgreSQL connection string named "melodiydb".
    /// </summary>
    /// <returns>The same <see cref="IServiceCollection"/> instance with <see cref="MelodiyDbContext"/> registered.</returns>
    public static IServiceCollection AddMelodiyDbContext(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        services.AddDbContext<MelodiyDbContext>(options => options.UseNpgsql(configurationManager.GetConnectionString("melodiydb")));

        return services;
    }

    /// <summary>
    /// Applies any pending Entity Framework Core migrations to the application's database at startup.
    /// </summary>
    /// <param name="app">The web application used to create a scoped service provider for resolving the database context.</param>
    public static void RegisterMigrations(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var dbContext = serviceScope.ServiceProvider.GetRequiredService<MelodiyDbContext>();
        dbContext.Database.Migrate();
    }
}