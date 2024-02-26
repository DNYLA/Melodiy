using Melodiy.Features;
using Melodiy.Infrastructure.Extensions;
using Melodiy.Web.Common.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

//Custom Services
builder.Services
       .AddFeatures()
       .AddMelodiyContext(builder.Configuration)
       .AddUserModule()
       .AddAuthenticationModule(builder.Configuration)
       .AddPlaylistModule();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

//Custom App Initialisations
app.UseMiddleware<ErrorHandlingMiddleware>();
app.RegisterMigrations();

app.Run();
