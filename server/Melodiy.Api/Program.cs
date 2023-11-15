
global using Mapster;
using Melodiy.Api.Filters;
using Melodiy.Api.Middleware;
using Melodiy.Application;
using Melodiy.Application.Services.Playlist;
using Melodiy.Contracts.Playlist;
using Melodiy.Infrastructure;
using Microsoft.Net.Http.Headers;

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddAplication()
        .AddInfrastructure(builder.Configuration);
    // builder.Services.AddControllers(options => options.Filters.Add<ErrorHandlingFilter>());
    builder.Services.AddControllers();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
        {
            policy
                .WithOrigins("http://localhost:3000", "http://localhost:3001", "https://melodiy.net")
                .WithHeaders(HeaderNames.ContentType, "Access-Control-Allow-Headers")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });


    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}


var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    // if (app.Environment.IsDevelopment())
    // {
    //     app.UseSwagger();
    //     app.UseSwaggerUI();
    // }
    ConfigureMapster();
    app.UseMiddleware<ErrorHandlingMiddleware>();
    // app.UseExceptionHandler("/error");
    app.UseCors(MyAllowSpecificOrigins);
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}

static void ConfigureMapster()
{
    TypeAdapterConfig<PlaylistResponse, GetPlaylistResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);
}