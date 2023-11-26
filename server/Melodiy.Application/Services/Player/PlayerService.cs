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

        var nextTracks = await GenerateQueue(collectionId, type, trackId, position, shuffle, claims.Id);

        var curTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
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

    public async Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, type, collectionId, 0, false, claims);
        }


        // if (curHistory.NextTracks.Count == 0 && !curHistory.Repeat)
        if (curHistory.NextTracks.Count == 0)
        {
            //Restats queue from first song or replays curSong.
            var restartTrackId = curHistory.PreviousTracks.FirstOrDefault()?.Slug ?? trackId;
            return await Play(restartTrackId, type, collectionId, 0, curHistory.Shuffle, claims);
        }

        //Log Current Track
        curHistory.PreviousTracks.Add(curHistory.CurrentTrack.Adapt<TrackPreview>());
        var nextTrack = curHistory.NextTracks[0];
        curHistory.NextTracks.RemoveAt(0);

        var curTrack = await _trackService.Get(nextTrack.Slug, claims.Id, true);
        curHistory.CurrentTrack = new CurrentTrackLog
        {
            Id = curTrack.Id,
            Slug = curTrack.Slug,
            Duration = curTrack.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        _userHistory[claims.Id] = curHistory;

        //Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore

        return new PlayerResponse
        {
            CurrentTrack = curTrack,
            Queue = new(),
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