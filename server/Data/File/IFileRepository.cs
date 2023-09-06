namespace melodiy.server.Data.File
{
    public interface IFileRepository
    {
        Task<ServiceResponse<string>> UploadImage(IFormFile file, string owner);
        Task<ServiceResponse<string>> UploadSong(IFormFile file, string owner);
        Task<bool> DeleteFile(string bucket, string path);
        bool IsValidType(string contentType, FileType type);
    }
}