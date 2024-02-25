namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Common.Context;

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class MelodiyDbContextServiceExtensions
{
    public static IServiceCollection AddMelodiyContext(this IServiceCollection services,
                                                       ConfigurationManager configurationManager)
    {
        services.AddDbContext<MelodiyDbContext>(
            options => options.UseNpgsql(configurationManager.GetConnectionString("DefaultConnection")));

        return services;
    }

    public static void RegisterMigrations(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var dbContext = serviceScope.ServiceProvider.GetRequiredService<MelodiyDbContext>();
        dbContext.Database.Migrate();
    }
}