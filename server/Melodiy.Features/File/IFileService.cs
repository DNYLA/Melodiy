namespace Melodiy.Features.File;

using Melodiy.Features.Image.Models;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public interface IFileService
{
    Task<ImageResponse?> UploadImage(IFormFile file);

    Task<FileResponse?> UploadAudio(IFormFile file, bool isPublic);

    Task<bool> DeleteFile(string bucket);

    Task<double> GetAudioDuration(IFormFile file);

    Task<string> GetUrl(string path);
}