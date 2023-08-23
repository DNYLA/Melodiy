using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Data.File
{
    public class SupabaseRepository : IFileRepository
    {
        private readonly Supabase.Client _client;
        public SupabaseRepository(Supabase.Client client)
        {
            _client = client;
        }

        public async Task<string> UploadImage(IFormFile image)
        {
            return await UploadFile(image, "images");
        }

        public async Task<string> UploadSong(IFormFile song)
        {
            return await UploadFile(song, "songs");

        }

        private async Task<string> UploadFile(IFormFile file, string bucket)
        {
            var fileName = await GetFileName(Path.GetExtension(file.FileName), bucket);
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var res = await _client.Storage
                .From(bucket)
                .Upload(memoryStream.ToArray(), fileName);
            Console.WriteLine(res);
            return res;
        }

        public bool IsValidType(string contentType, FileType type)
        {
            if (type == FileType.Image) {
                return contentType.StartsWith("image/");
            }

            return false;
        }

        private async Task<string> GetFileName(string extension, string bucket)
        {
            bool isValid = false;
            
            while (!isValid)
            {
                string randomId =  Guid.NewGuid().ToString("N");
                string newFileName = randomId + extension; 
                var response = await _client.Rpc("storage_file_exists", new Dictionary<string, object> { { "path", newFileName}, { "bucket", bucket} });

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
            if (path.StartsWith(bucket + '/')) {
                path = path.Substring(bucket.Length + 1);
            }

            Console.WriteLine(path);
            await _client.Storage.From(bucket).Remove(new List<string> { path });

            return true;
        }
    }
}