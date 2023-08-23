using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Data.File
{
    public interface IFileRepository
    {
        Task<string> UploadImage(IFormFile file);
        Task<string> UploadSong(IFormFile file);
        Task<bool> DeleteFile(string bucket, string path);
        bool IsValidType(string contentType, FileType type);
    }
}