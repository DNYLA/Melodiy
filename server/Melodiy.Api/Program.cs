
global using Mapster;
using Melodiy.Api.Bindings;
using Melodiy.Api.Middleware;
using Melodiy.Application;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.Playlist;
using Melodiy.Application.Services.TrackService;
using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.Playlist;
using Melodiy.Contracts.Track;
using Melodiy.Domain.Entities;
using Melodiy.Infrastructure;
using Melodiy.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddAplication()
        .AddInfrastructure(builder.Configuration);
    // builder.Services.AddControllers(options => options.Filters.Add<ErrorHandlingFilter>());
    builder.Services.AddControllers(options =>
    {
        options.ModelBinderProviders.Insert(0, new ClaimsModelBinderProvider());
    });

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

    //Apply Database migrations automatically on app launch
    using (var serviceScope = app.Services.CreateScope())
    {
        var dbContext = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
        await dbContext.Database.MigrateAsync();

        var storageProvider = serviceScope.ServiceProvider.GetRequiredService<IFileRepository>();
        await storageProvider.Initialise();
    }


    app.Run();
}

static void ConfigureMapster()
{
    TypeAdapterConfig<PlaylistResponse, GetPlaylistResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);


    TypeAdapterConfig<AlbumResponse, GetAlbumResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

    TypeAdapterConfig<AlbumResponse, GetAlbumPreview>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug);

    TypeAdapterConfig<ArtistResponse, GetArtistResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

    TypeAdapterConfig<ArtistResponse, GetArtistDetails>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

    TypeAdapterConfig<ArtistResponse, GetArtistPreview>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug);

    TypeAdapterConfig<Track, TrackResponse>.NewConfig()
        .Map(dest => dest.Artists, src => src.TrackArtists.Select(ta => ta.Artist).ToList())
        .IgnoreIf((src, dest) => src.AlbumTrack == null || src.AlbumTrack.Album == null, dest => dest.Album)
        .Map(dest => dest.Album, src => src.AlbumTrack!.Album ?? null);

    TypeAdapterConfig<TrackResponse, GetTrackResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

    TypeAdapterConfig<TrackResponse, GetFullTrackResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Path, src => src.FilePath)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

    TypeAdapterConfig<ArtistPreview, GetArtistPreview>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug);

    TypeAdapterConfig<AlbumPreview, GetAlbumPreview>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug);

    TypeAdapterConfig<TrackPreview, GetTrackResponse>.NewConfig()
        .Map(dest => dest.Id, src => src.Slug)
        .Map(dest => dest.Image, src => src.Image != null ? src.Image.Url : null);

}