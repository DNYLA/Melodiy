using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Search;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Application.Services.BulkInsertService;
using Melodiy.Application.Services.TrackService;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Services.SearchService;

//This service needs re-writing
//It would be better if each individual function SearchAlbum, SearchArtist, etc fetched the external data (that way we always have the best data) but it should be done in a way where
//if a user decides to SearchAll via Search() we can search once for Albums, Tracks, artists and pass that down.
public class SearchService : ISearchService
{
    private readonly IExternalSearchProvider _searchProvider;
    private readonly IDataContext _context;
    private readonly IArtistService _artistService;
    private readonly IBulkInsertService _bulkInsertService;

    public SearchService(IDataContext context, IArtistService artistService, IExternalSearchProvider searchProvider, IBulkInsertService bulkInsertService)
    {
        _context = context;
        _artistService = artistService;
        _searchProvider = searchProvider;
        _bulkInsertService = bulkInsertService;
    }

    public async Task<SearchResult> Search(string term, int limit = 10)
    {
        ExternalSearchResult externalResult = await _searchProvider.Search(term, 10);

        var externalArtists = (await _bulkInsertService.BulkInsertExternalArtists(externalResult.Artists)).Adapt<List<ArtistResponse>>(); //External Search Provider
        var allArtists = (await SearchArtist(term, limit)).Concat(externalArtists).GroupBy(a => a.Id).Select(a => a.First()).ToList(); //Combines & removes duplicates
        var sortedArtists = SortList(allArtists, artist => artist.Name, term).ToList(); //Results Sorted by Term

        var externalAlbums = (await _bulkInsertService.BulkInsertExternalAlbums(externalResult.Albums)).Adapt<List<AlbumResponse>>();
        var allAlbums = (await SearchAlbums(term, limit)).Concat(externalAlbums).GroupBy(a => a.Id).Select(a => a.First()).ToList();
        var sortedAlbums = SortList(allAlbums, album => album.Title, term).ToList();

        var externalTracks = (await _bulkInsertService.BulkInsertExternalTracks(externalResult.Tracks)).Adapt<List<TrackResponse>>().DistinctBy(t => t.Title);
        var allTracks = (await SearchTracks(term, limit)).Concat(externalTracks).DistinctBy(t => t.Id).ToList();
        var sortedTracks = SortList(allTracks, track => track.Title, term).ToList();

        var result = new SearchResult
        {
            Artists = sortedArtists.Take(limit).ToList(),
            Albums = sortedAlbums.Take(limit).ToList(),
            Tracks = sortedTracks.Take(limit).ToList(),
        };

        return result;
    }

    public async Task<List<AlbumResponse>> SearchAlbumsCreatedByUser(string term, string? artistSlug, int userId, int limit = 5)
    {
        Artist? artist = null;
        term = term.ToLower();
        if (artistSlug != null)
        {
            //NotFound artist error will bubble up to caller.
            artist = await _artistService.Get(artistSlug);
        }

        string[] searchTerms = term.Split(' ');
        IQueryable<Album> query = _context.Albums.AsQueryable();

        foreach (string curTerm in searchTerms)
        {
            //Search albums from a specific artist created by user or search through all the users created albums.
            query = artist != null
                ? query.Where(album => album.Artists.Any(a => a.Id == artist.Id) && album.UserId == userId && album.Title.ToLower().Contains(curTerm))
                : query.Where(album => album.UserId == userId && album.Title.ToLower().Contains(curTerm));
        }

        var albums = await query.OrderBy(a => a.Title).Include(a => a.Artists).Include(a => a.Image).Take(limit).ToListAsync();
        var mappedAlbums = albums.Adapt<List<AlbumResponse>>();
        var sortedAlbums = SortList(mappedAlbums, album => album.Title, term).ToList();

        return sortedAlbums;
    }

    public async Task<List<ArtistResponse>> SearchArtist(string term, int limit = 5)
    {
        //TODO: Change to Artists only search as we are requesting double what we need.
        //ExternalSearchResult externalResult = await _searchProvider.Search(term, limit);
        //var externalArtists = (await _bulkInsertService.BulkInsertExternalArtists(externalResult.Artists)).Adapt<List<ArtistResponse>>();
        term = term.ToLower();

        string[] searchTerms = term.Split(' ');
        IQueryable<Artist> query = _context.Artists.AsQueryable();

        foreach (string curTerm in searchTerms)
        {
            query = query.Where(artist => artist.Name.ToLower().Contains(curTerm));
        }

        var artists = await query.OrderBy(a => a.Name).Include(a => a.Image).Take(limit).ToListAsync();
        var mappedArtists = artists.Adapt<List<ArtistResponse>>();
        //var combinedArtists = mappedArtists.Concat(externalArtists).ToList();
        var sortedArtists = SortList(mappedArtists, artist => artist.Name, term).Take(limit).ToList();

        return sortedArtists.OrderByDescending(a => a.Verified).ToList();
    }

    public async Task<List<AlbumResponse>> SearchAlbums(string term, int limit = 5)
    {
        //TODO: Add Support for searching an album that is by an artist from term.
        term = term.ToLower();

        string[] searchTerms = term.Split(' ');
        IQueryable<Album> query = _context.Albums.AsQueryable();

        foreach (string curTerm in searchTerms)
        {
            query = query.Where(album => album.Title.ToLower().Contains(curTerm));
        }

        var albums = await query.OrderBy(a => a.Title)
                                .Include(a => a.Image)
                                .Include(a => a.Artists)
                                .Take(limit).ToListAsync();
        var mappedAlbums = albums.Adapt<List<AlbumResponse>>();
        var sortedAlbums = SortList(mappedAlbums, album => album.Title, term).Take(limit).ToList();

        return sortedAlbums.OrderByDescending(a => a.Verified).ToList();
    }

    public async Task<List<TrackResponse>> SearchTracks(string term, int limit = 5)
    {
        //TODO: Add Support for searching a track that is based off an album or artist term. e.g Drake will return a list of tracks with drake in the Album.Title, Artist.Name, Track.Title. (Track.Title should be preffered and weighted higher if its an exact match).
        term = term.ToLower();

        string[] searchTerms = term.Split(' ');
        IQueryable<Track> query = _context.Tracks.AsQueryable();

        foreach (string curTerm in searchTerms)
        {
            query = query.Where(track => track.Title.ToLower().Contains(curTerm));
        }

        var tracks = await query.OrderBy(t => t.Title).Include(t => t.Image)
                                .Include(t => t.AlbumTrack)
#nullable disable
                                    .ThenInclude(ta => ta.Album)
                                .Include(t => t.TrackArtists)
                                    .ThenInclude(ta => ta.Artist)
                                .Take(limit).ToListAsync();
        var mappedTracks = tracks.Adapt<List<TrackResponse>>();

        return SortList(mappedTracks, album => album.Title, term).Take(limit).ToList();
    }

    //TODO: Move to Sort Service || Make Extension?
    public static List<T> SortList<T>(List<T> list, Func<T, string> keySelector, string term)
    // public List<AlbumResponse> SortList(List<T> list, Func<AlbumResponse, string> keySelector, string term)
    {
        //Dictionary of List<T> as some songs can have the same score. 
        Dictionary<double, List<T>> scores = new();
        term = term.ToLower();
        List<T> orderedList = list.OrderBy(keySelector).ToList();

        orderedList.ForEach(track =>
        {
            double score = 0;
            var title = keySelector(track); //Album.Title or Artist.Name;
            bool isInTitle = term.Contains(title);

            //Add extra score for similarities
            double similarity = CalculateJaccardSimilarity(title, term);

            if (isInTitle)
            {
                score += 5;
            }

            score += similarity;

            if (!scores.ContainsKey(score))
            {
                scores[score] = new List<T>();
            }
            scores[score].Add(track);
        });

        // Convert Dictionary into 1D list of <T> objects based on sorted scores
        IOrderedEnumerable<double> sortedScores = scores.Keys.OrderByDescending(score => score);
        List<T> sortedTracks = new();
        foreach (double score in sortedScores)
        {
            sortedTracks.AddRange(scores[score]);
        }

        return orderedList;
    }

    //Calculates a score based on how many times each words intersect in both title and string
    //TODO: Move to Sort Service?
    private static double CalculateJaccardSimilarity(string title, string term)
    {
        HashSet<string> set1 = new(title.Split(' '));
        HashSet<string> set2 = new(term.Split(' '));

        int intersection = 0;
        foreach (string item in set1)
        {
            if (set2.Contains(item))
            {
                intersection++;
            }
        }

        int union = set1.Count + set2.Count - intersection;

        return (double)intersection / union;
    }
}