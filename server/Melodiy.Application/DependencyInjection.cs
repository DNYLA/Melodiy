global using Mapster;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.Authentication;
using Melodiy.Application.Services.BulkInsertService;
using Melodiy.Application.Services.FileService;
using Melodiy.Application.Services.PlayerService;
using Melodiy.Application.Services.Playlist;
using Melodiy.Application.Services.SearchService;
using Melodiy.Application.Services.TrackService;
using Melodiy.Application.Services.UserService;
using Microsoft.Extensions.DependencyInjection;

namespace Melodiy.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddAplication(this IServiceCollection services)
    {
        services.AddScoped<IAlbumService, AlbumService>();
        services.AddScoped<IArtistService, ArtistService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IBulkInsertService, BulkInsertService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<IPlayerService, PlayerService>();
        services.AddScoped<IPlaylistService, PlaylistService>();
        services.AddScoped<ISearchService, SearchService>();
        services.AddScoped<ITrackService, TrackService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}