
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.ArtistService;

public class ArtistService : IArtistService
{
    private readonly IDataContext _context;
    private readonly IFileRepository _fileRepository;

    public ArtistService(IDataContext context, IFileRepository fileRepository)
    {
        _context = context;
        _fileRepository = fileRepository;
    }


    public async Task<ArtistResponse> Create(string name, IFormFile? image, string username, int userId)
    {
        Image? uploadedImage = null;
        if (image != null)
        {
            uploadedImage = await _fileRepository.UploadImage(image, username, userId);
        }

        var artist = new Artist
        {
            Slug = Guid.NewGuid().ToString("N"),
            Name = name,
            Image = uploadedImage,
            User = _context.Users.Find(userId)!,
            Verified = false,
        };

        _context.Artists.Add(artist);
        await _context.SaveChangesAsync();

        return artist.Adapt<ArtistResponse>();
    }

    public async Task<Artist> Get(string slug, bool includeImage = false)
    {
        var artists = _context.Artists.AsQueryable();

        if (includeImage)
        {

            artists = artists.Include(artist => artist.Image);
        }
        var artist = await artists.FirstOrDefaultAsync(artist => artist.Slug == slug) ?? throw new ApiError(System.Net.HttpStatusCode.NotFound, $"Artist Id {slug} not found");

        return artist;
        // return artist.Adapt<ArtistResponse>();
    }
}