using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Services.FileService
{
    public interface IFileService
    {
        Task<ServiceResponse<string>> UploadImage(IFormFile image);
        Task<ServiceResponse<string>> UploadSong(IFormFile song);
        Task<ServiceResponse<bool>> DeleteFile(string bucket, string path);
        // Task<ServiceResponse<string>> UploadSong();
        // Task<ServiceResponse<string>> GetSong();
        // Task<ServiceResponse<string>> GetImage();
        // Task<ServiceResponse<string>> GetFile();
        // string GetFileUrl();
        

    }
}