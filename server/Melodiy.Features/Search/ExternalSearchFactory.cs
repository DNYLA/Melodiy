namespace Melodiy.Features.Search;

using Melodiy.Features.Album;
using Melodiy.Features.Album.Entities;
using Melodiy.Features.Artist;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Image;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Search.Models;
using Melodiy.Features.Track;
using Melodiy.Features.Track.Entities;
using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.Search;
using Melodiy.Integrations.Common.Search.Models;

using Microsoft.EntityFrameworkCore;

using System.Linq.Expressions;

public class ExternalSearchFactory(
    ISearchProvider searchProvider,
    IAlbumRepository albumRepository,
    IArtistRepository artistRepository,
    ITrackRepository trackRepository,
    IImageRepository imageRepository) : IExternalSearchFactory
{
    private readonly ISearchProvider _searchProvider = searchProvider;

    private readonly IAlbumRepository _albumRepository = albumRepository;

    private readonly IArtistRepository _artistRepository = artistRepository;

    private readonly ITrackRepository _trackRepository = trackRepository;

    private readonly IImageRepository _imageRepository = imageRepository;

    public async Task<SearchResult> Search(string term, int limit = 10)
    {
        var result = await _searchProvider.Search(term, 10);
        var model = new SearchResult
        {
            Source = result.Source
        };

        if (result.Albums.Any())
        {
            var createdAlbums = await BulkCreateAlbums(result.Albums, result.Source);
            model.Albums = createdAlbums.Select(album => album.ToResponse()).ToList();
        }

        if (result.Artists.Any())
        {
            var createdArtists = await BulkCreateArtists(result.Artists, result.Source);
            model.Artists = createdArtists.Select(artist => artist.ToResponse()).ToList();
        }

        if (result.Tracks.Any())
        {
            var createdTracks = await BulkCreateTracks(result.Tracks, result.Source);
            model.Tracks = createdTracks.Select(track => track.ToResponse()).ToList();
        }

        return model;
    }

    public List<Album> GetAlbumsBySourceType(List<string> ids, SourceType source)
    {
        // Define the predicate
        Expression<Func<Album, bool>> predicate;

        // Check the source type and define the predicate accordingly
        if (source == SourceType.Spotify)
        {
            predicate = album => album.SpotifyId != null && ids.Contains(album.SpotifyId);
        }
        else
        {
            throw new ArgumentException("Invalid source type");
        }

        // Apply the predicate and return the filtered queryable
        return albumRepository.AsQueryable()
                              .Where(predicate)
                              .Include(a => a.Image)
                              .Include(a => a.Artists)
                              .ToList();
    }

    //TODO: This service is way too big and the functions below need to be split up, but I'm not sure how
    //TODO: Functions below are hard coded with SpotifyId
    private async Task<List<Album>> BulkCreateAlbums(IEnumerable<ExternalAlbum> albums, SourceType source)
    {
        //Removes duplicates based on Id
        var filtered = albums.GroupBy(a => a.Id).Select(a => a.First()).ToList();

        //Fetch already existing albums
        var ids = filtered.Select(a => a.Id).ToList();
        var existingAlbums = GetAlbumsBySourceType(ids, source);

        var existingIds = existingAlbums.Select(a => a.SpotifyId!).ToList();
        var albumArtists = await BulkCreateArtists(filtered.SelectMany(album => album.Artists).ToList(), source);

        var newAlbums = filtered.ExceptBy(existingIds, album => album.Id).ToList();
        var newAlbumsWithImages = newAlbums.Select(album => new Album
        {
            Title = album.Title,
            Image = album.ImageUrl != null
                        ? new Image
                        {
                            Url = album.ImageUrl,
                            Source = SourceType.Spotify
                        }
                        : null,
            Artists = album.Artists
                           .Select(externalArtist => albumArtists.Find(a => a.SpotifyId == externalArtist.Id)!)
                           .ToList(), //Will Automatically relate but won't return related data
            ReleaseDate = album.ReleaseDate,
            Type = GetLocalCollectionType(album.Type),
            Verified = true,
            SpotifyId = album.Id,
        }).ToList();

        //Check if any of these images already exist.
        var urls = newAlbumsWithImages.Where(a => a.Image != null)
                                      .Select(a => a.Image!.Url)
                                      .ToList();
        var existingImages = _imageRepository
                             .AsQueryable().Where(i => i.Source == SourceType.Spotify && urls.Contains(i.Url))
                             .ToList();

        //Relate the existing images with the new artist.
        foreach (var album in newAlbumsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == album.Image?.Url);

            if (existingImage != null)
            {
                album.Image = existingImage;
            }
        }

        await _albumRepository.SaveAsync(newAlbumsWithImages);

        return existingAlbums.Concat(newAlbumsWithImages).ToList();
    }

    private async Task<List<Artist>> BulkCreateArtists(List<ExternalArtist> artists, SourceType source)
    {
        //Removes duplicates based on Id
        var filtered = artists.GroupBy(a => a.Id).Select(a => a.First()).ToList();

        //Fetch Already Existing Artists (Need this as we still want to return them)
        var ids = filtered.Select(artist => artist.Id)
                          .ToList(); //Needed for query below (Any isn't translatable to SQL but contains is)
        var existingArtists = _artistRepository.AsQueryable()
                                               .Where(a => a.SpotifyId != null && ids.Contains(a.SpotifyId))
                                               .Include(a => a.Image)
                                               .ToList();

        var existingIds = existingArtists.Select(a => a.SpotifyId!).ToList(); //SpotifyId can't be null in this case.

        //Filters out duplicates these are the only artists we need to insert
        var newArtists = filtered.ExceptBy(existingIds, artist => artist.Id).ToList();
        var newArtistsWithImages = newArtists.Select(artist => new Artist
        {
            Name = artist.Name,
            Image = artist.ImageUrl != null
                        ? new Image
                        {
                            Url = artist.ImageUrl,
                            Source = SourceType.Spotify
                        }
                        : null,
            Verified = true,
            SpotifyId = artist.Id,
        }).ToList();

        //Check if any of these images already exist.
        var urls = newArtistsWithImages.Where(a => a.Image != null).Select(a => a.Image!.Url).ToList();
        var existingImages = _imageRepository
                             .AsQueryable()
                             .Where(i => i.Source == SourceType.Spotify && urls.Contains(i.Url))
                             .ToList();

        //Relate the existing images with the new artist.
        foreach (var artist in newArtistsWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == artist.Image?.Url);

            if (existingImage != null)
            {
                artist.Image = existingImage;
            }
        }

        await _artistRepository.SaveAsync(newArtistsWithImages);

        return existingArtists.Concat(newArtistsWithImages).ToList();
    }

    private async Task<List<Track>> BulkCreateTracks(List<ExternalTrack> tracks, SourceType source)
    {
        //Removes duplicates based on Id
        var filtered = tracks.GroupBy(t => t.Id).Select(t => t.First()).ToList();

        //Fetch already existing albums
        var ids = filtered.Select(a => a.Id).ToList();
        var existingTracks = _trackRepository.AsQueryable().Include(t => t.Image)
                                             .Include(t => t.TrackArtists)
                                             .Include(t => t.AlbumTrack)
                                             .Where(t => t.SpotifyId != null && ids.Contains(t.SpotifyId))
                                             .ToList();

        var existingIds = existingTracks.Select(a => a.SpotifyId!).ToList();
        var trackArtists = await BulkCreateArtists(filtered.SelectMany(track => track.Artists).ToList(), source);
        var trackAlbums = await BulkCreateAlbums(filtered.Select(track => track.Album).ToList(), source);

        var newTracks = filtered.ExceptBy(existingIds, track => track.Id).ToList();
        var newTracksWithImages = newTracks.Select(track => new Track
        {
            Title = track.Title,
            Explicit = track.Explicit,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            SpotifyId = track.Id,
            Source = SourceType.Spotify,
            Public = true,
            Image = track.Album.ImageUrl != null
                        ? new Image
                        {
                            Url = track.Album.ImageUrl,
                            Source = SourceType.Spotify
                        }
                        : null,
            TrackArtists = track.Artists.Select(externalArtist =>
            {
                var artist = trackArtists.Find(a => a.SpotifyId == externalArtist.Id)!;

                return new TrackArtist
                {
                    ArtistId = artist.Id,
                };
            }).ToList(),
            AlbumTrack = new AlbumTrack
            {
                Position = track.Position,
                AlbumId = trackAlbums.Find(album => album.SpotifyId == track.Album.Id)!.Id,
            }
        }).ToList();

        //Check if any of these images already exist.
        var urls = newTracksWithImages.Where(t => t.Image != null).Select(t => t.Image!.Url).ToList();
        var existingImages = _imageRepository.AsQueryable().Where(i => urls.Contains(i.Url)).ToList();

        //Relate the existing images with the new artist.
        foreach (var track in newTracksWithImages)
        {
            var existingImage = existingImages.FirstOrDefault(i => i.Url == track.Image?.Url);

            if (existingImage != null)
            {
                track.Image = existingImage;
            }
        }

        await _trackRepository.SaveAsync(newTracksWithImages);

        return existingTracks.Concat(newTracksWithImages).ToList();
    }

    private CollectionType GetLocalCollectionType(ExternalAlbumType externalType)
    {
        return externalType switch
        {
            ExternalAlbumType.Album => CollectionType.Album,
            ExternalAlbumType.Ep => CollectionType.Ep,
            ExternalAlbumType.Single => CollectionType.Single,
            _ => CollectionType.Album
        };
    }
}