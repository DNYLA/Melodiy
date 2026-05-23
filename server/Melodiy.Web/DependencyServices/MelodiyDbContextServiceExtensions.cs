namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.Common.Data;

using Microsoft.EntityFrameworkCore;

public static class MelodiyDbContextServiceExtensions
{
    public static IServiceCollection AddMelodiyDbContext(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        services.AddDbContext<MelodiyDbContext>(options => options.UseNpgsql(configurationManager.GetConnectionString("melodiydb")));

        return services;
    }

    public static void RegisterMigrations(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var dbContext = serviceScope.ServiceProvider.GetRequiredService<MelodiyDbContext>();
        dbContext.Database.Migrate();
    }
}