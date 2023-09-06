namespace melodiy.server.Data.File
{
    public interface IFileRepository
    {
        Task<string> UploadImage(IFormFile file, string owner);
        Task<string> UploadSong(IFormFile file, string owner);
        Task<bool> DeleteFile(string bucket, string path);
        bool IsValidType(string contentType, FileType type);
    }
}