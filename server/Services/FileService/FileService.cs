using melodiy.server.Data.File;
using melodiy.server.Services.AuthService;

namespace melodiy.server.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IAuthService _authService;
        
        public FileService(IFileRepository imageRepository, IAuthService authService)
        {
            _fileRepository = imageRepository;
            _authService = authService;
        }

        public async Task<ServiceResponse<string>> UploadImage(IFormFile image)
        {
            string username = _authService.GetUsername();
            ServiceResponse<string> response = new ServiceResponse<string>();

            if (image == null || image.Length == 0 || !IsValidImageContentType(image.ContentType))
            {
                response.Success = false;
                response.StatusCode = 400;
                response.Message = "Invalid file type.";
                return response;
            }

            try
            {
                string path = await _fileRepository.UploadImage(image, username);
                response.Data = path;
            }
            catch
            {
                response.Success = false;
                response.StatusCode = 500;
                response.Message = "Unexpected Server Error.";
            }

            return response;
        }

        public async Task<ServiceResponse<string>> UploadSong(IFormFile file)
        {
            string username = _authService.GetUsername();
            ServiceResponse<string> response = new ServiceResponse<string>();

            if (file == null || file.Length == 0 || !IsValidAudioContentType(file.ContentType))
            {
                response.Success = false;
                response.StatusCode = 400;
                response.Message = "Invalid file type.";
                return response;
            }

            try
            {
                string path = await _fileRepository.UploadSong(file, username);
                response.Data = path;
            }
            catch
            {
                response.Success = false;
                response.StatusCode = 500;
                response.Message = "Unexpected Server Error.";
            }

            return response;
        }

        private static bool IsValidImageContentType(string contentType)
        {
            return contentType.StartsWith("image/");
        }

        private static bool IsValidAudioContentType(string contentType)
        {
            return contentType is "audio/wav" or "audio/mpeg";
        }

        public async Task<ServiceResponse<bool>> DeleteFile(string bucket, string path)
        {
            ServiceResponse<bool> response = new ServiceResponse<bool>();
            try
            {
                _ = await _fileRepository.DeleteFile(bucket, path);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.StatusCode = 500;
            }

            return response;
        }
    }
}