namespace Melodiy.Infrastructure.Extensions;

using Melodiy.Features.Search;

using Microsoft.Extensions.DependencyInjection;

public static class SearchServiceExtensions
{
    public static IServiceCollection AddSearchModule(this IServiceCollection services)
    {
        services.AddScoped<ISearchService, SearchService>();
        services.AddScoped<IExternalSearchFactory, ExternalSearchFactory>();

        return services;
    }
}