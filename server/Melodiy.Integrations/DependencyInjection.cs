namespace Melodiy.Integrations;

using Melodiy.Integrations.Common.File;
using Melodiy.Integrations.Supabasee;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

public static class DependencyInjection
{
    public static IServiceCollection AddSupabase(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        var supabaseSettings = new SupabaseSettings();
        configuration.Bind(SupabaseSettings.SectionName, supabaseSettings);
        Supabase.SupabaseOptions options = new()
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true,
        };

        services.AddSingleton(Options.Create(supabaseSettings));
        services.AddSingleton(
            provider => new Supabase.Client(supabaseSettings.Url, supabaseSettings.ServiceRole, options));
        services.AddScoped<IFileRepository, SupabaseFileRepository>();

        return services;
    }

    public static void InitialiseStorageProvider(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var storageProvider = serviceScope.ServiceProvider.GetRequiredService<IFileRepository>();
        storageProvider.Initialise();
    }
}