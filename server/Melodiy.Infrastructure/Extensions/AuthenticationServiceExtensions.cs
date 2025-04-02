namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Authentication;
using Melodiy.Features.Authentication.Jwt;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.Text;

using Melodiy.Features.Authentication.Repository;

public static class AuthenticationServiceExtensions
{
    public static IServiceCollection AddAuthenticationModule(this IServiceCollection services,
                                                             ConfigurationManager configurationManager)
    {
        services.RegisterJwt(configurationManager);
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
        services.AddScoped<IUserKeyRepository, UserKeyRepository>();

        return services;
    }

    private static void RegisterJwt(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        var jwtSettings = new AuthenticationSettings();
        configurationManager.Bind(AuthenticationSettings.SectionName, jwtSettings);
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
    }
}