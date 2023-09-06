using System.Security.Cryptography;

namespace melodiy.server.Data.File
{
    public class SupabaseRepository : IFileRepository
    {
        private readonly Supabase.Client _client;
        private readonly IConfiguration _configuration;
        public SupabaseRepository(Supabase.Client client, IConfiguration configuration)
        {
            _configuration = configuration;
            _client = client;
        }

        public async Task<ServiceResponse<string>> UploadImage(IFormFile file, string owner)
        {
            ServiceResponse<string> response = new();
            string bucket = GetBucketName(FileType.Image);

            using MemoryStream memoryStream = new();
            await file.CopyToAsync(memoryStream);

            string fileName = ComputeFileHash(memoryStream) + Path.GetExtension(file.FileName);
            string supabasePath = $"{owner}/{fileName}";
            string url = _configuration.GetSection("AppSettings:SupabaseURL").Value! ?? throw new InvalidOperationException("SupabaseURL AppSetting not set!");


            if (await IsDuplicate(supabasePath, FileType.Image))
            {
                response.Data = $"{url}/storage/v1/object/public/{bucket}/{supabasePath}";
                return response;
            }

            string res = await _client.Storage
                .From(bucket)
                .Upload(memoryStream.ToArray(), supabasePath);
            Console.WriteLine(res);

            //TODO: Grab From CLient?
            response.Data = $"{url}/storage/v1/object/public/{res}";
            return response;
        }

        public async Task<ServiceResponse<string>> UploadSong(IFormFile file, string owner)
        {
            ServiceResponse<string> response = new();
            string bucket = GetBucketName(FileType.Audio);

            using MemoryStream memoryStream = new();
            await file.CopyToAsync(memoryStream);

            string fileName = ComputeFileHash(memoryStream) + Path.GetExtension(file.FileName);
            string supabasePath = $"{owner}/{fileName}";
            Console.WriteLine(fileName);

            if (await IsDuplicate(supabasePath, FileType.Audio))
            {
                response.Success = false;
                response.Message = "You've already uploaded this file!";
                response.StatusCode = 409;
                return response;
            }

            string res = await _client.Storage
                .From(bucket)
                .Upload(memoryStream.ToArray(), supabasePath);
            Console.WriteLine(res);
            string url = _configuration.GetSection("AppSettings:SupabaseURL").Value! ?? throw new InvalidOperationException("SupabaseURL AppSetting not set!");

            //TODO: Grab From CLient?
            response.Data = $"{url}/storage/v1/object/public/{res}";
            return response;
        }

        public bool IsValidType(string contentType, FileType type)
        {
            return type == FileType.Image && contentType.StartsWith("image/");
        }

        private static string GetBucketName(FileType type)
        {
            return type == FileType.Image ? "images" : "songs"; ;
        }

        private async Task<bool> IsDuplicate(string filePath, FileType type)
        {
            string bucket = GetBucketName(type);

            Postgrest.Responses.BaseResponse response = await _client.Rpc("storage_file_exists", new Dictionary<string, object> { { "path", filePath }, { "bucket", bucket } });

            return response.Content != "false";
        }

        private static string ComputeFileHash(MemoryStream stream)
        {
            byte[] hash = MD5.HashData(stream.ToArray());
            return BitConverter.ToString(hash).Replace("-", "").ToLower(System.Globalization.CultureInfo.CurrentCulture);
        }

        public async Task<bool> DeleteFile(string bucket, string path)
        {
            if (path.StartsWith(bucket + '/'))
            {
                path = path[(bucket.Length + 1)..];
            }

            Console.WriteLine(path);
            _ = await _client.Storage.From(bucket).Remove(new List<string> { path });

            return true;
        }
    }
}