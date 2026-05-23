namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.Common.Data;

using Microsoft.EntityFrameworkCore;

public static class MelodiyDbContextServiceExtensions
{
    public static IServiceCollection AddMelodiyDbContext(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        var connectionString = configurationManager.GetConnectionString("melodiydb");
        if (string.IsNullOrWhiteSpace(connectionString))
            throw new ArgumentNullException($"MelodiyDb {nameof(connectionString)} has not been provided");

        services.AddDbContext<MelodiyDbContext>(options => options.UseNpgsql(connectionString));

        return services;
    }

    public static void RegisterMigrations(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var dbContext = serviceScope.ServiceProvider.GetRequiredService<MelodiyDbContext>();
        dbContext.Database.Migrate();
    }
}