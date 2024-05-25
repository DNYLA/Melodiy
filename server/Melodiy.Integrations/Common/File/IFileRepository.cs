namespace Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public interface IFileRepository
{
    Task<FileResponse> UploadFile(IFormFile file, string subPath, StorageBucket bucket);

    Task<bool> DeleteFile(string subPath, StorageBucket bucket);

    Task<string> GetUrl(string subPath, StorageBucket bucket);

    Task Initialise();

    SourceType GetSourceType();
}