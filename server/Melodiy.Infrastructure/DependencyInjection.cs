using System.Text;
using Melodiy.Application.Common.Interfaces.Authentication;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Infrastructure.Authentication;
using Melodiy.Infrastructure.Persistance;
using Melodiy.Infrastructure.Persistance.File;
using Melodiy.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Melodiy.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        services.AddDbContext<IDataContext, DataContext>(options => options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
        services.AddAuth(configuration);
        services.AddSupabase(configuration);

        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IHashService, HashService>();

        // services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }

    public static IServiceCollection AddAuth(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        var jwtSettings = new JwtSettings();
        configuration.Bind(JwtSettings.SectionName, jwtSettings);

        // services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton(Options.Create(jwtSettings));
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

        services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings.Secret))
            });


        return services;
    }

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
        services.AddSingleton(provider => new Supabase.Client(supabaseSettings.Url, supabaseSettings.PrivateKey, options));
        services.AddScoped<IFileRepository, SupabaseRepository>();

        return services;
    }
}