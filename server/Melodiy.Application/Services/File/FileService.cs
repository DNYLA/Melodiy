using System.Net;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;
using ATL;
using Melodiy.Application.Common.Enums;

namespace Melodiy.Application.Services.FileService;

public class FileService : IFileService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;

    public FileService(IDataContext context, IFileRepository fileRepository)
    {
        _context = context;
        _fileRepository = fileRepository;
    }

    public async Task<Image> UploadImage(IFormFile image, string username, int userId)
    {
        if (image == null || image.Length == 0 || !IsValidImageContentType(image.ContentType))
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Invalid Image file.");
        }
        var response = await _fileRepository.UploadImage(image, username, userId);

        return response;
    }

    public async Task<string> UploadAudio(IFormFile track, string username, bool isPublic)
    {
        if (track == null || track.Length == 0 || !IsValidAudioContentType(track.ContentType))
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Invalid Audio file, Only MP3/Wav is supported.");
        }
        var response = await _fileRepository.UploadAudio(track, username, isPublic);

        return response;
    }

    public Task<bool> DeleteFile(string bucket, string path)
    {
        throw new NotImplementedException();
    }

    public async Task<double> GetAudioDuration(IFormFile file)
    {
        if (file == null || file.Length == 0 || !IsValidAudioContentType(file.ContentType))
        {
            throw new ApiError(HttpStatusCode.BadRequest, "Invalid Audio file, Only MP3/Wav is supported.");
        }

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);
        memoryStream.Position = 0; //Doesn't work without this here dk why

        ATL.Track track = new(memoryStream);
        return track.DurationMs;
    }

    public async Task<string> GetUrl(string path, StorageBucket bucket)
    {
        return await _fileRepository.GetUrl(path, bucket);
    }

    private static bool IsValidImageContentType(string contentType)
    {
        Console.WriteLine(contentType);
        return contentType.StartsWith("image/") || contentType is "application/octet-stream";
    }

    private static bool IsValidAudioContentType(string contentType)
    {
        Console.WriteLine(contentType);
        return contentType is "audio/wav" or "audio/mpeg";
    }
}