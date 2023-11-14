using System.Runtime.InteropServices;
using Melodiy.Application.Common.Enums;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Supabase;

namespace Melodiy.Infrastructure.Persistance.File;

public class SupabaseRepository : IFileRepository
{
    private readonly Client _client;
    private readonly SupabaseSettings _supabaseSettings;
    private readonly IHashService _hashService;
    private readonly IDataContext _context;
    public SupabaseRepository(Client client, IDataContext context, IHashService hashService, IOptions<SupabaseSettings> supabaseOptions)
    {
        _client = client;
        _context = context;
        _hashService = hashService;
        _supabaseSettings = supabaseOptions.Value;
    }

    public async Task<Image> UploadImage(IFormFile file, string username, int userId)
    {
        Console.WriteLine("Uploading Image");
        string bucket = GetBucketName(StorageBucket.Images);

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);

        string fileHash = _hashService.HashFile(memoryStream);
        string fileName = fileHash + Path.GetExtension(file.FileName);
        string supabasePath = $"{username}/{fileName}";

        if (await IsDuplicate(StorageBucket.Images, supabasePath))
        {
            var foundImage = await _context.Images
                .FirstOrDefaultAsync(image => image.Path == supabasePath && image.User != null && image.User.Id == userId);

            if (foundImage == null)
            {
                return await CreateImage(supabasePath, userId);
            }

            return foundImage;
        }

        string res = await _client.Storage
            .From(bucket)
            .Upload(memoryStream.ToArray(), supabasePath);

        var image = await CreateImage(supabasePath, userId);

        return image;
    }

    //Not inside image service as it would cause a circular dependency since we need the URL (could be avoided but it makes sense having it inside the storage repository.)
    private async Task<Image> CreateImage(string path, int userId)
    {
        var bucketName = GetBucketName(StorageBucket.Images);
        var url = $"{_supabaseSettings.Url}/storage/v1/object/public/";
        var imageUrl = $"{url}/{bucketName}/{path}";

        var image = new Image
        {
            Url = imageUrl,
            Path = path,
            Source = SourceType.Local,
            UserId = userId,
        };

        _context.Images.Add(image);
        await _context.SaveChangesAsync();

        return image;
    }

    public Task<string> UploadTrack(IFormFile file, string username, bool isPublic)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteFile(StorageBucket bucket, string path)
    {
        throw new NotImplementedException();
    }

    public Task<string> GetUrl(StorageBucket bucket, string path)
    {
        throw new NotImplementedException();
    }

    private static string GetBucketName(StorageBucket bucket)
    {
        return bucket switch
        {
            StorageBucket.Images => "images",
            StorageBucket.TrackPublic => "tracks",
            StorageBucket.TracksPrivate => "tracks-private",
            _ => throw new Exception("Unknown StorageBucket type passed")
        };
    }

    private async Task<bool> IsDuplicate(StorageBucket bucket, string path)
    {
        var bucketName = GetBucketName(bucket);
        Postgrest.Responses.BaseResponse response = await _client.Rpc("storage_file_exists", new Dictionary<string, object> { { "path", path }, { "bucket", bucketName } });

        return response.Content != "false";
    }

}