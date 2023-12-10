using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.TrackService;
using Melodiy.Domain.Entities;
using Melodiy.Domain.Enums;
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
        List<Album> existingAlbums = _context.Albums.Where(a => a.ExternalSearchId != null && ids.Contains(a.ExternalSearchId))
                                                    .Include(a => a.Image)
                                                    .Include(a => a.Artists)
                                                    .ToList();
        List<string> existingIds = existingAlbums.Select(a => a.ExternalSearchId!).ToList();
        List<Artist> albumArtists = await BulkInsertExternalArtists(albums.SelectMany(album => album.Artists).ToList());

        List<ExternalAlbum> newAlbums = albums.ExceptBy(existingIds, album => album.Id).ToList();
        var newAlbumsWithImages = newAlbums.Select(album => new Album
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = album.Title,
            Image = album.ImageUrl != null ? new Image
            {
                Url = album.ImageUrl,
                Source = SourceType.External
            } : null,
            Artists = album.Artists.Select(externalArtist => albumArtists.Find(a => a.ExternalSearchId == externalArtist.Id)!).ToList(), //Will Automatically relate but won't return related data
            ReleaseDate = album.ReleaseDate,
            Type = album.Type,
            Verified = true,
            ExternalSearchId = album.Id,
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newAlbumsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => i.Source == SourceType.External && urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var album in newAlbumsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == album.Image?.Url);

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
        List<Artist> existingArtists = _context.Artists.Where(a => a.ExternalSearchId != null && ids.Contains(a.ExternalSearchId)).Include(a => a.Image).ToList();
        List<string> existingIds = existingArtists.Select(a => a.ExternalSearchId!).ToList(); //SpotifyId can't be null in this case.

        //Filters out duplicates theese are the only artists we need to insert
        List<ExternalArtist> newArtists = artists.ExceptBy(existingIds, artist => artist.Id).ToList();
        var newArtistsWithImages = newArtists.Select(artist => new Artist
        {
            Slug = Guid.NewGuid().ToString("N"),
            Name = artist.Name,
            Image = artist.ImageUrl != null ? new Image
            {
                Url = artist.ImageUrl,
                Source = SourceType.External
            } : null,
            Verified = true,
            ExternalSearchId = artist.Id,
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newArtistsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => i.Source == SourceType.External && urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var artist in newArtistsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == artist.Image?.Url);

            if (existingImage != null)
            {
                artist.Image = existingImage;
            }
        }
        _context.Artists.AddRange(newArtistsWithImages);
        await _context.SaveChangesAsync();

        return existingArtists.Concat(newArtistsWithImages).ToList();
    }

    public async Task<List<TrackResponse>> BulkInsertExternalTracks(List<ExternalTrack> data)
    {
        //Removes duplicates based on Id
        List<ExternalTrack> tracks = data.GroupBy(t => t.Id).Select(t => t.First()).ToList();

        //Fetch already existing albums
        List<string> ids = tracks.Select(a => a.Id).ToList();
        List<Track> existingTracks = _context.Tracks.Where(t => t.ExternalSearchId != null && ids.Contains(t.ExternalSearchId))
                                                    .Include(t => t.Image)
                                                    .Include(t => t.TrackArtists)
                                                    .Include(t => t.Album)
                                                    .ToList();
        List<string> existingIds = existingTracks.Select(a => a.ExternalSearchId!).ToList();
        List<Artist> trackArtists = await BulkInsertExternalArtists(tracks.SelectMany(track => track.Artists).ToList());
        List<Album> trackAlbums = await BulkInsertExternalAlbums(tracks.Select(track => track.Album).ToList());

        List<ExternalTrack> newTracks = tracks.ExceptBy(existingIds, track => track.Id).ToList();
        var newTracksWithImages = newTracks.Select(track => new Track
        {
            Slug = Guid.NewGuid().ToString("N"),
            Title = track.Title,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            ExternalSearchId = track.Id,
            Source = SourceType.External,
            IsPublic = true,
            Image = track.Album.ImageUrl != null ? new Image
            {
                Url = track.Album.ImageUrl,
                Source = SourceType.External
            } : null,
            TrackArtists = track.Artists.Select(externalArtist =>
            {
                var artist = trackArtists.Find(a => a.ExternalSearchId == externalArtist.Id)!;

                return new TrackArtist
                {
                    ArtistId = artist.Id,
                };
            }).ToList(),
            Album = trackAlbums.Find(album => album.ExternalSearchId == track.Album.Id),
        }).ToList();

        //Check if any of theese images already exist.
        List<string> urls = newTracksWithImages.Where(t => t.Image != null).Select(t => t.Image!.Url).ToList();
        var existingImages = _context.Images.Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var track in newTracksWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == track.Image?.Url);

            if (existingImage != null)
            {
                track.Image = existingImage;
            }
        }
        _context.Tracks.AddRange(newTracksWithImages);
        await _context.SaveChangesAsync();


        var allTracks = existingTracks.Concat(newTracksWithImages).ToList();
        foreach (var track in allTracks)
        {
            if (track.Album != null)
            {
                track.Album.Tracks = new();
            }
        }

        return allTracks.Adapt<List<TrackResponse>>();
    }
}
