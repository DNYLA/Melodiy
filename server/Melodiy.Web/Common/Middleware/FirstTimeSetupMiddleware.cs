namespace Melodiy.Web.Common.Middleware;

using Melodiy.Features.Common;
using Melodiy.Features.Common.Context;
using Melodiy.Features.User.Entities;

using Microsoft.Extensions.Caching.Memory;

public class FirstTimeSetupMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext httpContext)
    {
        var alreadySetup = AlreadyInitialised(httpContext);

        if (!alreadySetup && !(httpContext.Request.Path.HasValue && httpContext.Request.Path.StartsWithSegments("/setup") ))
        {
            httpContext.Response.Redirect("/setup", false);
            await httpContext.Response.CompleteAsync();
        }

        await next(httpContext);
    }

    private bool AlreadyInitialised(HttpContext context)
    {
        var cache = context.RequestServices.GetService<IMemoryCache>();

        if (cache == null)
        {
            return false;
        }

        if (cache.TryGetValue(CacheKeyConst.SetupAlreadyInitialisedKey, out bool initialised))
        {
            return initialised;
        }

        var initialisedCheck = InitialisedUserAlreadyExists(context);
        cache.Set(CacheKeyConst.SetupAlreadyInitialisedKey, initialisedCheck, DateTimeOffset.UtcNow.AddHours(1));

        return initialisedCheck;
    }

    private bool InitialisedUserAlreadyExists(HttpContext context)
    {
        var dbContext = context.RequestServices.GetService<MelodiyDbContext>();

        if (dbContext == null)
        {
            return false;
        }

        return dbContext.Users.Any(x => x.Role.Equals(Role.Owner));
    }
}
