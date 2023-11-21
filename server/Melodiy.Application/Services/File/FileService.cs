using System.Net;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.ImageService;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

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

        return response.Adapt<Image>();
    }

    public Task<string> UploadAudio(IFormFile song, string username)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteFile(string bucket, string path)
    {
        throw new NotImplementedException();
    }

    private static bool IsValidImageContentType(string contentType)
    {
        return contentType.StartsWith("image/");
    }

    private static bool IsValidAudioContentType(string contentType)
    {
        return contentType is "audio/wav" or "audio/mpeg";
    }
}