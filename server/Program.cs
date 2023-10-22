global using AutoMapper;
global using melodiy.server.Data;
global using melodiy.server.Dtos.User;
global using melodiy.server.Models;
global using melodiy.server.Services.PlaylistService;
global using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

using melodiy.server.Data.Auth;
using melodiy.server.Data.File;
using melodiy.server.Providers;
using melodiy.server.Providers.Search;
using melodiy.server.Services.AuthService;
using melodiy.server.Services.FileService;
using melodiy.server.Services.SearchService;
using melodiy.server.Services.SongService;
using melodiy.server.Services.UserService;
using server.Services.ArtistService;
using melodiy.server.Services.AlbumService;
using server.Services.AlbumService;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

string url = builder.Configuration.GetSection("AppSettings:SupabaseURL").Value!;
string key = builder.Configuration.GetSection("AppSettings:SupabaseKey").Value!;

Supabase.SupabaseOptions options = new()
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true,
    // SessionHandler = new SupabaseSessionHandler() <-- This must be implemented by the developer
};

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            _ = policy
                .WithOrigins("http://localhost:3000", "https://melodiy.net")
                .WithHeaders(HeaderNames.ContentType, "Access-Control-Allow-Headers")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = """Standard Authorization header using the Bearer scheme. Example: "bearer {token}" """,
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

//
builder.Services.AddSingleton(provider => new Supabase.Client(url, key, options));
// builder.Services.AddHangfire(config =>
//     config.UsePostgreSqlStorage(c =>
//         c.UseNpgsqlConnection(builder.Configuration.GetConnectionString("HangfireConnection"))));
// builder.Services.AddHangfireServer();

//API Repositories
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IFileRepository, SupabaseRepository>();

//API Providers
builder.Services.AddScoped<ISearchProvider, SpotifyProvider>();
builder.Services.AddScoped<IAudioProvider, YoutubeProvider>();

//API Services
builder.Services.AddScoped<ISearchService, SearchService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IArtistService, ArtistService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISongService, SongService>();
builder.Services.AddScoped<IPlaylistService, PlaylistService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddHttpContextAccessor();

WebApplication app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}

app.UseDeveloperExceptionPage();
app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();

//Custom App
// app.UseHangfireDashboard();

app.Run();
