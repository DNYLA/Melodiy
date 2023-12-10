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

public class SearchService : ISearchService
{
    private readonly IExternalSearchProvider _searchProvider;
    private readonly IDataContext _context;
    private readonly IArtistService _artistService;
    private readonly ITrackService _trackService;
    private readonly IBulkInsertService _bulkInsertService;

    public SearchService(IDataContext context, IArtistService artistService, IExternalSearchProvider searchProvider, ITrackService trackService, IBulkInsertService bulkInsertService)
    {
        _context = context;
        _artistService = artistService;
        _searchProvider = searchProvider;
        _trackService = trackService;
        _bulkInsertService = bulkInsertService;
    }

    public async Task<SearchResult> Search(string term, int limit = 10)
    {
        ExternalSearchResult externalResult = await _searchProvider.Search(term, 10);
        var result = new SearchResult
        {
            Artists = (await _bulkInsertService.BulkInsertExternalArtists(externalResult.Artists)).Adapt<List<ArtistResponse>>(),
            Albums = (await _bulkInsertService.BulkInsertExternalAlbums(externalResult.Albums)).Adapt<List<AlbumResponse>>(),
            Tracks = await _bulkInsertService.BulkInsertExternalTracks(externalResult.Tracks)
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
        //TODO: Move to ArtistService (Not needed right now as we aren't using an external search provider).
        term = term.ToLower();

        string[] searchTerms = term.Split(' ');
        IQueryable<Artist> query = _context.Artists.AsQueryable();

        foreach (string curTerm in searchTerms)
        {
            query = query.Where(artist => artist.Name.ToLower().Contains(curTerm));
        }

        var artists = await query.OrderBy(a => a.Name).Include(a => a.Image).Take(limit).ToListAsync();
        var mappedArtists = artists.Adapt<List<ArtistResponse>>();
        var sortedArtists = SortList(mappedArtists, artist => artist.Name, term).ToList();

        return sortedArtists;
    }

    //TODO: Move to Sort Service?
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
                score += 2;
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