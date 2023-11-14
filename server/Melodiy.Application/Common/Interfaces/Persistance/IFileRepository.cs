using Melodiy.Application.Common.Enums;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Common.Interfaces.Persistance;

public interface IFileRepository
{
    Task<Image> UploadImage(IFormFile file, string username, int userId);
    Task<string> UploadTrack(IFormFile file, string username, bool isPublic);
    Task<bool> DeleteFile(StorageBucket bucket, string path);
    // Task<string> GetSignedUrl(StorageBucket bucket, string path, int seconds = 150);
    // Task<string> GetPublicUrl(StorageBucket bucket, string path);
    Task<string> GetUrl(StorageBucket bucket, string path);
}