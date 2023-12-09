
using Melodiy.Application.Common.Entities;
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

    public async Task<List<Artist>> BulkInsertExternal(List<ExternalArtist> data)
    {
        //Removes duplicates based on Id
        List<ExternalArtist> artists = data.GroupBy(a => a.Id).Select(a => a.First()).ToList();

        //Fetch Already Existing Artists (Need this as we still want to return them)
        List<string> ids = artists.Select(d => d.Id).ToList(); //Needed for query below (Any isn't translatable to SQL but contains is)
        List<Artist> existingArtists = _context.Artists.Where(a => a.SpotifyId != null && ids.Contains(a.SpotifyId)).Include(a => a.Image).ToList();
        List<string> existingIds = existingArtists.Select(a => a.SpotifyId!).ToList(); //SpotifyId can't be null in this case.

        //Filters out duplicates theese are the only artists we need to insert
        List<ExternalArtist> newArtists = artists.ExceptBy(existingIds, artist => artist.Id).ToList();
        var newArtistsWithImages = newArtists.Select(artist => new Artist
        {
            Slug = Guid.NewGuid().ToString("N"),
            Name = artist.Name,
            Image = artist.ImageUrl != null ? new Image
            {
                Url = artist.ImageUrl,
            } : null,
            Verified = true,
            SpotifyId = artist.Id,
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newArtistsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var artist in newArtistsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == artist.Image!.Url);

            if (existingImage != null)
            {
                artist.Image = existingImage;
            }
        }
        _context.Artists.AddRange(newArtistsWithImages);
        await _context.SaveChangesAsync();

        return existingArtists.Concat(newArtistsWithImages).ToList();
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