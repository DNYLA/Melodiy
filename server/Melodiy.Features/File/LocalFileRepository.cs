namespace Melodiy.Features.File;

using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;

public sealed class LocalFileRepository : IFileRepository
{
    public async Task<FileResponse> UploadFile(IFormFile file, string path, StorageBucket bucket)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteFile(string path, StorageBucket bucket)
    {
        throw new NotImplementedException();
    }

    public async Task<string> GetUrl(string path, StorageBucket bucket)
    {
        throw new NotImplementedException();
    }

    public async Task Initialise()
    {
        throw new NotImplementedException();
    }
}