namespace Melodiy.Features.ContentNetworkDelivery;

using System.Net;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Track;
using Melodiy.Features.User;
using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

using SpotifyAPI.Web;

[ApiController]
[Route("cdn")]
public class ContentNetworkDeliveryController(IMemoryCache cache, ITrackRepository trackRepository, IUserService userService) : ControllerBase
{
    private readonly IMemoryCache _cache = cache;

    private readonly ITrackRepository _trackRepository = trackRepository;

    private readonly IUserService _userService = userService;

    [HttpGet("{*subPath}")]
    public async Task<IActionResult> Get(string subPath)
    {
        if (_cache.TryGetValue(subPath, out byte[]? content) && content != null)
        {
            return File(content, "application/octet-stream");
        }

        var bucket = GetBucketType(subPath);
        content = await LoadContentFromDisk(subPath, bucket);
        
        if (content == null)
        {
            return NotFound();
        }

        if (!bucket.Equals(StorageBucket.TracksPrivate))
        {
            _cache.Set(subPath, content, TimeSpan.FromMinutes(30));
        }

        return File(content, "application/octet-stream");
    }

    private static StorageBucket GetBucketType(string subPath)
    {
        if (subPath.StartsWith("images"))
        {
            return StorageBucket.Images;
        }

        if (subPath.StartsWith("tracks-private"))
        {
            return StorageBucket.TracksPrivate;
        }

        if (subPath.StartsWith("tracks"))
        {
            return StorageBucket.TrackPublic;
        }
        


        throw new ApiException(HttpStatusCode.NotFound);
    }

    private async Task<byte[]?> LoadContentFromDisk(string fileName, StorageBucket bucket)
    {
        try
        {
            if (bucket.Equals(StorageBucket.TracksPrivate) && !await HasAccess(fileName))
            {
                return null;
            }

            var filePath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "Melodiy", fileName);

            //TODO: FIX The .Replace()
            return await System.IO.File.ReadAllBytesAsync(filePath);
        }
        catch
        {
            return null;
        }
    }

    private async Task<bool> HasAccess(string fileName)
    {
        var strippedPath = fileName.Replace("tracks-private/", string.Empty);

        var user = await _userService.GetUserDetails();
        if (user == null) return false;

        return await _trackRepository.AsQueryable().AnyAsync(x =>
            x.Path != null &&
            x.Path.ToLower() == strippedPath.ToLower() &&
            x.UserId == user.Id &&
            x.Source == SourceType.Local &&
            !x.Public);
    }
}
