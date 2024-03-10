namespace Melodiy.Features.Common.Extensions;

using Microsoft.AspNetCore.Http;

public static class FormFileExtensions
{
    public static bool IsImage(this IFormFile file)
    {
        return file.ContentType.StartsWith("image/") || file.ContentType is "application/octet-stream";
    }

    public static bool IsAudio(this IFormFile file)
    {
        return file.ContentType is "audio/wav" or "audio/mpeg";
    }
}
