namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;

public static class ImageExtensions
{
    public static ImageResponse? ConvertToImageResponse(this Image? image)
    {
        if (image == null)
        {
            return new ImageResponse();
        }

        return new ImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            Path = image.Path,
            Source = image.Source,
            UserId = image.UserId
        };
    }
}