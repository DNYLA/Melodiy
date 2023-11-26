using System.Net;
using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.TrackService;

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

    public async Task<PlayerResponse> Play(int position, CollectionType type, string collectionId, bool shuffle, UserClaims? claims)
    {
        if (claims == null)
        {
            //Currently only files are implemented which require auth
            throw new ApiError(HttpStatusCode.Unauthorized, "You must be logged in to play a track");
            // if (trackId == null) throw new ApiError(HttpStatusCode.BadRequest, "A TrackId must be provided if you aren't logged in");
            // //Guests don't have a track history
            // var guestTrack = await _trackService.Get(trackId, null, true);
            // return new PlayerResponse
            // {
            //     CurrentTrack = guestTrack,
            //     Queue = new(),
            // };
        }

        var queue = await GenerateQueue(collectionId, type, position, shuffle, claims.Id);

        if (queue.Count == 0)
        {
            throw new ApiError(HttpStatusCode.NotFound, "No Tracks found");
        }

        //TODO: Redo this as you should be refetching the track? although EF Core does cache in memory so this shouldnt be a bad thing?
        var track = await _trackService.Get(queue[0].Slug, null, true);
        queue.RemoveAt(0);

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
            NextTracks = queue,
        };

        //Overwrite What is currently stored as Play() is only called whenever a track is manually selected.
        _userHistory[claims.Id] = newHistory;

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = queue,
        };
    }

    public async Task<PlayerResponse> Next(string collectionId, CollectionType type, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(0, type, collectionId, false, claims);
        }

        if (curHistory.NextTracks.Count == 0)
        {
            //Restats queue from first song.
            return await Play(0, type, collectionId, curHistory.Shuffle, claims);
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

    private async Task<List<TrackPreview>> GenerateQueue(string collectionId, CollectionType type, int position, bool shuffle, int userId)
    {
        if (type != CollectionType.Files)
        {
            throw new ApiError(HttpStatusCode.NotImplemented, "Not Implemented");
        }

        if (position < 0)
        {
            position = 0;
        }

        var tracks = await _trackService.GetUserTracks(userId);

        if (tracks.Count == 0)
        {
            throw new ApiError(HttpStatusCode.InternalServerError, "Unexpected Server Error");
        }

        if (position >= tracks.Count)
        {
            position = 0; //Restart to first track
        }

        //TODO: Also return previous tracks if you aren't shuffling
        List<TrackResponse> previousTracks = tracks.Take(position - 1).ToList();
        List<TrackResponse> nextTracks = tracks.Skip(position).ToList();

        return nextTracks.Adapt<List<TrackPreview>>();
    }
}