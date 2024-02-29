namespace Melodiy.Integrations.Supabasee;

using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using Supabase;
using Supabase.Storage.Exceptions;

public sealed class SupabaseFileRepository(Client client, IOptions<SupabaseSettings> settings, IHashService hashService)
    : IFileRepository
{
    private readonly Client _client = client;

    private readonly SupabaseSettings _settings = settings.Value;

    private readonly IHashService _hashService = hashService;

    public async Task<FileResponse> UploadFile(IFormFile file, string path, StorageBucket bucket)
    {
        var bucketName = BucketName(bucket);

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);

        var fileHash = _hashService.File(memoryStream);
        var fileName = fileHash + Path.GetExtension(file.FileName);
        var fullPath = $"{path}/{fileName}";

        var model = new FileResponse()
        {
            Url = string.Empty,
            Path = fullPath,
            Source = SourceType.Supabase
        };

        if (await IsDuplicate(fullPath, bucket))
        {
            model.Url = await GetUrl(fullPath, bucket);
            return model;
        }

        var res = await _client.Storage
                               .From(bucketName)
                               .Upload(memoryStream.ToArray(), fullPath);

        model.Url = await GetUrl(fullPath, bucket);
        return model;
    }

    public async Task<bool> DeleteFile(string path, StorageBucket bucket)
    {
        throw new NotImplementedException();
    }

    public async Task<string> GetUrl(string path, StorageBucket bucket)
    {
        var bucketName = BucketName(bucket);

        if (bucket != StorageBucket.TracksPrivate)
        {
            var url = $"{_settings.Url}/storage/v1/object/public";
            var fileUrl = $"{url}/{bucketName}/{path}";
            return fileUrl;
        }

        try
        {
            return await _client.Storage.From(bucketName).CreateSignedUrl(path, 120);
        }
        catch (SupabaseStorageException ex)
        {
            Console.WriteLine(ex.StatusCode);
            return string.Empty;
        }
        catch (Exception ex)
        {
            //TODO: Add SeriLog
            return string.Empty;
        }
    }

    public async Task Initialise()
    {
        var buckets = await _client.Storage.ListBuckets();
        var publicImageName = BucketName(StorageBucket.Images);
        var publicTrackName = BucketName(StorageBucket.TrackPublic);
        var privateTrackName = BucketName(StorageBucket.TracksPrivate);

        if (buckets == null)
        {
            //Create All Buckets
            await CreateBucket(publicImageName, true);
            await CreateBucket(publicTrackName, true);
            await CreateBucket(privateTrackName, false);
            return;
        }

        //TODO: Re-write to cleaner function (Lambda/Anon function to find + create based off name)
        if (buckets.Find(b => b.Name == publicImageName) == null)
        {
            await CreateBucket(publicImageName, true);
        }

        if (buckets.Find(b => b.Name == publicTrackName) == null)
        {
            await CreateBucket(publicTrackName, true);
        }

        if (buckets.Find(b => b.Name == privateTrackName) == null)
        {
            await CreateBucket(privateTrackName, false);
        }
    }

    private async Task CreateBucket(string name, bool isPublic)
    {
        await _client.Storage.CreateBucket(name, new Supabase.Storage.BucketUpsertOptions { Public = isPublic });
    }

    private static string BucketName(StorageBucket bucket)
    {
        return bucket switch
        {
            StorageBucket.Images => "images",
            StorageBucket.TrackPublic => "tracks",
            StorageBucket.TracksPrivate => "tracks-private",
            _ => throw new Exception("Unknown StorageBucket type")
        };
    }

    private async Task<bool> IsDuplicate(string path, StorageBucket bucket)
    {
        var bucketName = BucketName(bucket);
        var response = await _client.Rpc("storage_file_exists",
                                         new Dictionary<string, object> { { "path", path }, { "bucket", bucketName } });

        return response.Content != "false";
    }
}