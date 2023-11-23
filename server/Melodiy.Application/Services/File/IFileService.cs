using Melodiy.Application.Common.Enums;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.FileService;

public interface IFileService
{
    Task<Image> UploadImage(IFormFile image, string username, int userId);
    Task<string> UploadAudio(IFormFile song, string username, bool isPublic);
    Task<bool> DeleteFile(string bucket, string path);
    Task<double> GetAudioDuration(IFormFile file);
    Task<string> GetUrl(string path, StorageBucket bucket);
}