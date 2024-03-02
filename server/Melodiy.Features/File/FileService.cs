﻿namespace Melodiy.Features.File;

using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Image;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;
using Melodiy.Features.User;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public sealed class FileService(
    IFileRepository fileRepository,
    IImageRepository imageRepository,
    IUserService userService) : IFileService
{
    private readonly IFileRepository _fileRepository = fileRepository;

    private readonly IImageRepository _imageRepository = imageRepository;

    private readonly IUserService _userService = userService;

    public async Task<ImageResponse?> UploadImage(IFormFile file)
    {
        var user = await _userService.GetUserDetails();

        if (user == null || file.Length == 0 || !file.IsImage())
        {
            return null;
        }

        var response = await _fileRepository.UploadFile(file, user.Username, StorageBucket.Images);

        var image = new Image
        {
            Url = response.Url,
            Path = response.Path,
            Source = response.Source,
            UserId = user.Id
        };

        await _imageRepository.AddAsync(image);

        return new ImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            Path = image.Path,
            Source = image.Source,
            UserId = image.UserId
        };
    }

    public async Task<FileResponse?> UploadAudio(IFormFile file, bool isPublic)
    {
        var user = await _userService.GetUserDetails();

        if (user == null || file.Length == 0 || !file.IsAudio())
        {
            return null;
        }

        var bucketType = isPublic ? StorageBucket.TrackPublic : StorageBucket.TracksPrivate;
        var response = await _fileRepository.UploadFile(file, "", bucketType);

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

        //TODO: Install ATL Package to get track duration;

        return 0;
    }

    public async Task<string> GetUrl(string path)
    {
        return await _fileRepository.GetUrl(path, StorageBucket.TracksPrivate);
    }
}