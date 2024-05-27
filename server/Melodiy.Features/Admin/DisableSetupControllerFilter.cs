namespace Melodiy.Features.Admin;

using Melodiy.Features.Common;
using Melodiy.Features.Common.Context;
using Melodiy.Features.User.Entities;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

public class DisableSetupControllerFilter
    : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var alreadySetup = AlreadyInitialised(context.HttpContext);

        if (alreadySetup)
        {
            context.Result = new NotFoundResult();
        }
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