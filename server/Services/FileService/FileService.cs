using melodiy.server.Data.File;

namespace melodiy.server.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        public FileService(IFileRepository imageRepository)
        {
            _fileRepository = imageRepository;
        }

        public async Task<ServiceResponse<string>> UploadImage(IFormFile image)
        {
            var response = new ServiceResponse<string>();

            if (image == null || image.Length == 0 || !IsValidImageContentType(image.ContentType))
            {
                response.Success = false;
                response.StatusCode = 400;
                response.Message = "Invalid file type.";
                return response;
            }

            try 
            {
                string path = await _fileRepository.UploadImage(image);
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
            var response = new ServiceResponse<string>();

            if (file == null || file.Length == 0 || !IsValidAudioContentType(file.ContentType))
            {
                response.Success = false;
                response.StatusCode = 400;
                response.Message = "Invalid file type.";
                return response;
            }

            try 
            {
                string path = await _fileRepository.UploadSong(file);
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

        private bool IsValidImageContentType(string contentType)
        {
            return contentType.StartsWith("image/");
        }

        private bool IsValidAudioContentType(string contentType)
        {
            return contentType == "audio/wav" || contentType == "audio/mpeg";
        }

        public async Task<ServiceResponse<bool>> DeleteFile(string bucket, string path)
        {
            var response = new ServiceResponse<bool>();
            try 
            {
                await _fileRepository.DeleteFile(bucket, path);
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