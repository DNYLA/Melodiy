namespace Melodiy.Integrations.Local;

using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.File;

using Microsoft.AspNetCore.Http;
using System.IO;

public class LocalFileRepository(IHashService hashService, IHttpContextAccessor httpContextAccessor) : IFileRepository
{
    private readonly IHashService _hashService = hashService;

    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public const string BaseFolderName = "Melodiy";

    public async Task<FileResponse> UploadFile(IFormFile file, string subPath, StorageBucket bucket)
    {
        var bucketPath = BucketPath(bucket);

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);

        var fileHash = _hashService.File(memoryStream);
        var fileName = fileHash + Path.GetExtension(file.FileName);
        var scopedPath = Path.Join(subPath, fileName);
        var fullPath = Path.Join(bucketPath, scopedPath);

        var model = new FileResponse
        {
            Url = string.Empty,
            Path = scopedPath,
            Source = SourceType.Local
        };

        if (!File.Exists(fullPath))
        {
            Directory.CreateDirectory(Path.GetDirectoryName(fullPath) ?? throw new InvalidOperationException());

            await using Stream fileStream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(fileStream);
        }

        model.Url = await GetUrl(scopedPath, bucket);

        return model;
    }

    public Task<bool> DeleteFile(string subPath, StorageBucket bucket)
    {
        throw new NotImplementedException();
    }

    //TODO: Test for docker containers
    public async Task<string> GetUrl(string subPath, StorageBucket bucket)
    {
        var request = httpContextAccessor?.HttpContext?.Request;

        if (request == null)
        {
            throw new Exception("No valid host found");
        }

        var location = new Uri($"{request.Scheme}://{request.Host}/api/cdn");
        var url = location.AbsoluteUri;
        var path = Path.Join(url, BucketName(bucket), subPath);

        return await Task.FromResult(path);
    }

    //TODO: Test & Figure out how this can be handled with docker?
    public Task Initialise()
    {
        var publicImagePath = BucketPath(StorageBucket.Images);
        var publicTrackPath = BucketPath(StorageBucket.TrackPublic);
        var privateTrackPath = BucketPath(StorageBucket.TracksPrivate);

        if (!Directory.Exists(publicImagePath))
        {
            Directory.CreateDirectory(publicImagePath);
        }

        if (!Directory.Exists(publicTrackPath))
        {
            Directory.CreateDirectory(publicTrackPath);
        }

        if (!Directory.Exists(privateTrackPath))
        {
            Directory.CreateDirectory(privateTrackPath);
        }

        return Task.CompletedTask;
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

    private static string BucketPath(StorageBucket bucket)
    {
        var melodiyApplicationPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), BaseFolderName);

        return bucket switch
        {
            StorageBucket.Images => Path.Join(melodiyApplicationPath, BucketName(StorageBucket.Images)),
            StorageBucket.TrackPublic => Path.Join(melodiyApplicationPath, BucketName(StorageBucket.TrackPublic)),
            StorageBucket.TracksPrivate => Path.Join(melodiyApplicationPath, BucketName(StorageBucket.TracksPrivate)),
            _ => throw new Exception("Unknown StorageBucket type")
        };
    }

    public SourceType GetSourceType() => SourceType.Local;
}
