
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Melodiy.Application.Services.AlbumService;

public class AlbumService : IAlbumService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AlbumService(IDataContext context, IFileRepository fileRepository, IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _fileRepository = fileRepository;
        _dateTimeProvider = dateTimeProvider;
    }


    public async Task<AlbumResponse> Create(string title, long timestamp, IFormFile? image, string username, int userId)
    {
        Image? uploadedImage = null;
        // if (image != null)
        // {
        //     uploadedImage = await _fileRepository.UploadImage(image, username, userId);
        // }

        var utcReleaseTime = _dateTimeProvider.UnixTimeStampToUtc(timestamp);
        var Album = new Album
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = title,
            Verified = false,
            ReleaseDate = utcReleaseTime,
            Type = AlbumType.Album,
            Image = uploadedImage,
            User = _context.Users.Find(userId)!,
        };

        _context.Albums.Add(Album);
        await _context.SaveChangesAsync();

        return Album.Adapt<AlbumResponse>();
    }

    public Task<AlbumResponse> Get(string id)
    {
        throw new NotImplementedException();
    }
}