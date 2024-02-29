namespace Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public interface IFileRepository
{
    Task<FileResponse> UploadFile(IFormFile file, string path, StorageBucket bucket);

    Task<bool> DeleteFile(string path, StorageBucket bucket);

    Task<string> GetUrl(string path, StorageBucket bucket);

    Task Initialise();
}