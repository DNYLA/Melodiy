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

        public async Task<string> UploadImage(IFormFile image, string owner)
        {
            return await UploadFile(image, owner, FileType.Image);
        }

        public async Task<string> UploadSong(IFormFile song, string owner)
        {
            return await UploadFile(song, owner, FileType.Music);
        }

        private async Task<string> UploadFile(IFormFile file, string owner, FileType type)
        {
            string bucket = GetBucketName(type);
            if (bucket == string.Empty)
            {
                return string.Empty;
            }

            string fileName = await GetFileName(Path.GetExtension(file.FileName), bucket);
            string supabasePath = $"{owner}/{fileName}";

            using MemoryStream memoryStream = new();
            await file.CopyToAsync(memoryStream);
            string res = await _client.Storage
                .From(bucket)
                .Upload(memoryStream.ToArray(), supabasePath);
            Console.WriteLine(res);
            string url = _configuration.GetSection("AppSettings:SupabaseURL").Value! ?? throw new InvalidOperationException("SupabaseURL AppSetting not set!");
            //TODO: Grab From CLient?
            return $"{url}/storage/v1/object/public/{res}";
        }

        public bool IsValidType(string contentType, FileType type)
        {
            return type == FileType.Image && contentType.StartsWith("image/");
        }

        private static string GetBucketName(FileType type)
        {
            if (type == FileType.Image)
            {
                return "images";
            }
            else if (type == FileType.Music)
            {
                return "songs";
            };

            return String.Empty;
        }

        private async Task<string> GetFileName(string extension, string bucket)
        {
            bool isValid = false;

            while (!isValid)
            {
                string randomId = Guid.NewGuid().ToString("N");
                string newFileName = randomId + extension;
                Postgrest.Responses.BaseResponse response = await _client.Rpc("storage_file_exists", new Dictionary<string, object> { { "path", newFileName }, { "bucket", bucket } });

                if (response.Content == "false")
                {
                    // Console.WriteLine("Does not exist");
                    return newFileName;
                }
            }

            return Guid.NewGuid().ToString("N") + extension; //This will never get hit? fallsafe
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

        public Task<string> UploadImage(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<string> UploadSong(IFormFile file)
        {
            throw new NotImplementedException();
        }
    }
}