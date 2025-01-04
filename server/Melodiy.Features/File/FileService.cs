namespace Melodiy.Features.File;

using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Image;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;
using Melodiy.Features.User.Models;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public sealed class FileService(
    IFileRepository fileRepository,
    IImageRepository imageRepository,
    IHttpContextAccessor httpContextAccessor) : IFileService
{
    public async Task<ImageResponse> UploadImage(IFormFile file)
    {
        var user = GetCurrentUser();

        if (user == null || file.Length == 0 || !file.IsImage())
        {
            throw new ApiException(HttpStatusCode.BadRequest, "Invalid Image file");
        }

        var response = await fileRepository.UploadFile(file, user.Username, StorageBucket.Images);
        var imageExists = await imageRepository.GetByPath(response.Path, response.Source);

        if (imageExists != null)
        {
            return new ImageResponse
            {
                Id = imageExists.Id,
                Url = imageExists.Url,
                Path = imageExists.Path,
                Source = imageExists.Source,
                UserId = imageExists.UserId
            };
        }

        var image = new Image
        {
            Url = response.Url,
            Path = response.Path,
            Source = response.Source,
            UserId = user.Id
        };

        await imageRepository.AddAsync(image);

        return new ImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            Path = image.Path,
            Source = image.Source,
            UserId = image.UserId
        };
    }

    public async Task<FileResponse> UploadAudio(IFormFile file, bool isPublic)
    {
        var user = GetCurrentUser();

        if (user == null || file.Length == 0 || !file.IsAudio())
        {
            throw new ApiException(HttpStatusCode.BadRequest, "Invalid Audio file");
        }

        var bucketType = isPublic ? StorageBucket.TrackPublic : StorageBucket.TracksPrivate;
        var response = await fileRepository.UploadFile(file, user.Username, bucketType);

        return response;
    }

    public async Task<bool> DeleteFile(string bucket)
    {
        throw new NotImplementedException();
    }

    public async Task<double> GetAudioDuration(IFormFile file)
    {
        if (file.Length == 0 || !file.IsAudio())
        {
            return -1;
        }

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        ATL.Track track = new(memoryStream);

        return track.DurationMs;
    }

    public async Task<string> GetTrackUrl(string path, bool isPublic)
    {
        var bucket = isPublic ? StorageBucket.TrackPublic : StorageBucket.TracksPrivate;
        return await fileRepository.GetUrl(path, bucket);
    }

    //TODO: We should refactor and move the current user outside of this function as parameters so services have to pass the value in.
    public UserResponse? GetCurrentUser()
    {
        var user = httpContextAccessor.HttpContext?.User;
        var model = new UserResponse();

        if (user == null || user.Identity?.IsAuthenticated == false)
        {
            return null;
        }

        var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value;
        var username = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value;

        //TODO: Fetch user from DB Cache and return cached data.
        model.Id = int.Parse(userId);
        model.Username = username;

        return model;
    }
}