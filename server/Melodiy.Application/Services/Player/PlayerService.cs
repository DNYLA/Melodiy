using System.Net;
using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.TrackService;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.PlayerService;

public class PlayerService : IPlayerService
{
    private readonly ITrackService _trackService;
    private readonly IDateTimeProvider _dateProvider;
    private readonly IDataContext _context;
    private static readonly Dictionary<int, PlayerHistory> _userHistory = new(); //Stored as Dictionary<UserId, PlayerHistory>();


    public PlayerService(ITrackService trackService, IDateTimeProvider dateProvider, IDataContext context)
    {
        _trackService = trackService;
        _dateProvider = dateProvider;
        _context = context;
    }

    public async Task<PlayerResponse> Play(string trackId, CollectionType type, string collectionId, int position, bool shuffle, UserClaims? claims)
    {
        var track = await _trackService.Get(trackId, claims?.Id);
        if (claims == null)
        {
            //Guests don't have a track history
            return new PlayerResponse
            {
                CurrentTrack = track,
                Queue = new(),
            };
        }

        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);
        var nextTracks = await GenerateQueue(collectionId, type, trackId, position, shuffle, claims.Id);

        var curTrack = new CurrentTrackLog
        {
            TrackSlug = track.Slug,
            TrackDurationMs = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        var newHistory = new PlayerHistory
        {
            CollectionId = collectionId,
            CollectionType = type,
            Shuffle = shuffle,
            Repeat = false, //Not Needed for playing can default to false
            PreviousTracks = new(), //Not adding this one as its the current playing track
            CurrentTrack = curTrack,
            NextTracks = nextTracks,
        };

        //Overwrite What is currently stored as Play() is only called whenever a track is manually selected.
        _userHistory[claims.Id] = newHistory;

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = nextTracks,
        };
    }


    private async Task<List<TrackPreview>> GenerateQueue(string collectionId, CollectionType type, string trackId, int position, bool shuffle, int userId)
    {
        if (type != CollectionType.Files)
        {
            throw new ApiError(HttpStatusCode.NotImplemented, "Not Implemented");
        }

        if (position <= 0)
        {
            position = 1;
        }

        var tracks = await _trackService.GetUserTracks(userId);

        if (tracks.Count == 0)
        {
            throw new ApiError(HttpStatusCode.InternalServerError, "Unexpected Server Error");
        }

        var pos = tracks.FindIndex(t => t.Slug == trackId);
        Console.WriteLine(pos);
        Console.WriteLine(trackId);

        //TODO: Also return previous tracks if you aren't shuffling
        List<TrackResponse> previousTracks = tracks.Take(pos).ToList();
        List<TrackResponse> nextTracks = tracks.Skip(pos + 1).ToList();

        return nextTracks.Adapt<List<TrackPreview>>();
    }
}