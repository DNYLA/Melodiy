namespace Melodiy.Features.Admin;

using Melodiy.Features.Common;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[ApiController]
[Route("[controller]")]
[DisableSetupControllerFilter]
public sealed class SetupController(IMemoryCache memoryCache) : ControllerBase
{
    private readonly IMemoryCache _memoryCache = memoryCache;

    [HttpGet]
    public IActionResult Setup()
    {
        return Accepted();
    }

    [HttpPost]
    public IActionResult Register()
    {
        _memoryCache.Remove(CacheKeyConst.SetupAlreadyInitialisedKey);

        return Ok();
    }
}