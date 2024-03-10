namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;

public static class ImageExtensions
{
    public static string? GetUrl(this Image? image, bool fallback = true)
    {
        //TODO: Return fallback if null

        return image?.Url;
    }

    public static string? GetUrl(this ImageResponse? image, bool fallback = true)
    {
        //TODO: Return fallback if null

        return image?.Url;
    }
}