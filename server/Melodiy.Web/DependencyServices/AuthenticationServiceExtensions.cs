namespace Melodiy.Web.DependencyServices;

using Melodiy.Features.Authentication.Options;
using Melodiy.Features.Authentication.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text;

public static class AuthenticationServiceExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddAuthenticationServices(ConfigurationManager configuration)
        {
            services.AddJwt(configuration);

            // Services
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            return services;
        }

        private void AddJwt(ConfigurationManager configuration)
        {
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            var authenticationSettings = configuration.GetSection(AuthenticationSettings.SectionName).Get<AuthenticationSettings>() ?? throw new ArgumentNullException(nameof(AuthenticationSettings));

            if (string.IsNullOrEmpty(authenticationSettings.Secret) || authenticationSettings.Secret.Length < 32)
                throw new InvalidOperationException("Authentication secret must be at least 32 characters.");

            services.Configure<AuthenticationSettings>(configuration.GetSection(AuthenticationSettings.SectionName));

            services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.Audience = AuthenticationSettings.Audience;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = AuthenticationSettings.Issuer,
                            ValidAudience = AuthenticationSettings.Audience,
                            IssuerSigningKey =
                                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.Secret))
                        };
                    });
        }
    }
}