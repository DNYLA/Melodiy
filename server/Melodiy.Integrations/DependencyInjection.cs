namespace Melodiy.Integrations;

using Melodiy.Integrations.Common.File;
using Melodiy.Integrations.Common.Search;
using Melodiy.Integrations.Common.Stream;
using Melodiy.Integrations.Spotify;
using Melodiy.Integrations.Supabasee;
using Melodiy.Integrations.Youtube;

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

    private static IServiceCollection AddSpotifyProvider(this IServiceCollection services, ConfigurationManager configuration)
    {
        var spotifySettings = new SpotifySettings();
        configuration.Bind(SpotifySettings.SectionName, spotifySettings);

        if (string.IsNullOrWhiteSpace(spotifySettings.ClientSecret) ||
            string.IsNullOrWhiteSpace(spotifySettings.ClientId))
        {
            services.AddDefaultSearchProvider();
            return services;
        }

        services.AddSingleton(Options.Create(spotifySettings));
        services.AddScoped<ISearchProvider, SpotifySearchProvider>();

        return services;
    }

    private static IServiceCollection AddDefaultSearchProvider(this IServiceCollection services)
    {
        services.AddScoped<ISearchProvider, EmptySearchProvider>();
        return services;
    }

    public static IServiceCollection RegisterSearchProvider(this IServiceCollection services, ConfigurationManager configuration)
    {
        if (configuration.GetSection(SpotifySettings.SectionName).GetChildren().Any())
        {
            return services.AddSpotifyProvider(configuration);
        }

        return services.AddDefaultSearchProvider();
    }

    public static IServiceCollection RegisterStreamProvider(this IServiceCollection services, ConfigurationManager configuration)
    {
        //TODO: Add configs/settings to get preferred stream provider;
        return services.AddScoped<IStreamProvider, YoutubeStreamProvider>();
    }
}