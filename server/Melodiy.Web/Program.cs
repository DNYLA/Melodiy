using AngleSharp;
using Melodiy.Features;
using Melodiy.Infrastructure.Extensions;
using Melodiy.Integrations;
using Melodiy.Web.Common.Middleware;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllers();
var allowedHosts = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy
            .WithOrigins(allowedHosts)
            .WithHeaders(HeaderNames.ContentType, "Access-Control-Allow-Headers")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddMemoryCache();


//Custom Services
builder.Services
       .RegisterFileRepository(builder.Configuration)
       .RegisterSearchProvider(builder.Configuration)
       .RegisterStreamProvider(builder.Configuration)
       .AddFeatures()
       .AddMelodiyContext(builder.Configuration)
       .AddUserModule()
       .AddAuthenticationModule(builder.Configuration)
       .AddPlaylistModule()
       .AddArtistModule()
       .AddAlbumModule()
       .AddTrackModule()
       .AddSearchModule()
       .AddPlayerModule();

var app = builder.Build();

app.UseCors(myAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

//Custom App Initialisations
app.UseMiddleware<ErrorHandlingMiddleware>();
app.RegisterMigrations();
app.InitialiseFileRepository();
app.UseStaticFiles();
app.UseMiddleware<FirstTimeSetupMiddleware>();

app.Run();