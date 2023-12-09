using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.BulkInsertService;

//TODO: Implement MediatR; this is a quick fix to prevent circular dependecies.
public class BulkInsertService : IBulkInsertService
{
    private readonly IDataContext _context;
    public BulkInsertService(IDataContext dataContext)
    {
        _context = dataContext;
    }

    public async Task<List<Album>> BulkInsertExternalAlbums(List<ExternalAlbum> data)
    {
        //Removes duplicates based on Id
        List<ExternalAlbum> albums = data.GroupBy(a => a.Id).Select(a => a.First()).ToList();

        //Fetch already existing albums
        List<string> ids = albums.Select(a => a.Id).ToList();
        List<Album> existingAlbums = _context.Albums.Where(a => a.SpotifyId != null && ids.Contains(a.SpotifyId))
                                                    .Include(a => a.Image)
                                                    .Include(a => a.Artists)
                                                    .ToList();
        List<string> existingIds = existingAlbums.Select(a => a.SpotifyId!).ToList();
        List<Artist> albumArtists = await BulkInsertExternalArtists(albums.SelectMany(album => album.Artists).ToList());

        List<ExternalAlbum> newAlbums = albums.ExceptBy(existingIds, album => album.Id).ToList();
        var newAlbumsWithImages = newAlbums.Select(album => new Album
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = album.Title,
            Image = album.ImageUrl != null ? new Image
            {
                Url = album.ImageUrl,
            } : null,
            Artists = album.Artists.Select(externalArtist => albumArtists.Find(a => a.SpotifyId == externalArtist.Id)!).ToList(), //Will Automatically relate but won't return related data
            ReleaseDate = album.ReleaseDate,
            Type = album.Type,
            Verified = true,
            SpotifyId = album.Id,
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newAlbumsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var album in newAlbumsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == album.Image!.Url);

            if (existingImage != null)
            {
                album.Image = existingImage;
            }
        }
        _context.Albums.AddRange(newAlbumsWithImages);
        await _context.SaveChangesAsync();

        return existingAlbums.Concat(newAlbumsWithImages).ToList();
    }

    public async Task<List<Artist>> BulkInsertExternalArtists(List<ExternalArtist> data)
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
}
