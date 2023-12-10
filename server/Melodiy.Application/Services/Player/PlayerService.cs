using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.TrackService;
using System.Net;

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

    public async Task<PlayerResponse> Play(string trackId, int position, CollectionType type, string collectionId, bool shuffle, UserClaims? claims)
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

        var queue = await GenerateQueue(trackId, collectionId, type, position, shuffle, claims.Id);

        if (queue.Count == 0)
        {
            throw new ApiError(HttpStatusCode.NotFound, "No Tracks found");
        }

        if (position > queue.Count - 1)
        {
            position = 0; //Reset to start of queue;
        }

        //TODO: Redo this as you should be refetching the track? although EF Core does cache in memory so this shouldnt be a bad thing?
        var track = queue[position];
        track.FilePath = await _trackService.GetTrackPath(track.Id, claims?.Id);

        var curTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        var newHistory = new PlayerHistory
        {
            Position = position,
            CollectionId = collectionId,
            CollectionType = type,
            Shuffle = shuffle,
            Repeat = false, //Not Needed for playing can default to false
            CurrentTrack = curTrack,
            Queue = queue.Adapt<List<TrackPreview>>(),
        };

        //Overwrite What is currently stored as Play() is only called whenever a track is manually selected.
        _userHistory[claims.Id] = newHistory;

        //Server Queue and Client Queue are seperate
        //Server Queue = Queue of full playlist from start - finish (Could be shuffled)
        //Client Queue = List of Next Tracks that will play
        var clientQueue = queue.Skip(position + 1).ToList().Adapt<List<TrackPreview>>();

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = clientQueue,
        };
    }

    public async Task<PlayerResponse> Previous(string trackId, string collectionId, CollectionType type, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, 0, type, collectionId, false, claims);
        }

        curHistory.Position--;
        if (curHistory.Position < 0)
        {
            curHistory.Position = 0;
        }
        else if (curHistory.Position == 0 && curHistory.Repeat)
        {
            //If Repeat is enabled we go back to the last track otherwise we stay at track 0;
            curHistory.Position = curHistory.Queue.Count - 1;
        }

        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
        curHistory.CurrentTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        _userHistory[claims.Id] = curHistory;

        //Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = new(),
        };
    }

    public async Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, 0, type, collectionId, false, claims);
        }
        // Console.WriteLine("Next Pos: " + curHistory.Position);
        curHistory.Position++;
        if (curHistory.Position > curHistory.Queue.Count - 1)
        {
            curHistory.Position = 0; //Start back from first track.
        }

        //Log Current Track
        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);

        curHistory.CurrentTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        _userHistory[claims.Id] = curHistory;

        //Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = new(),
        };
    }

    private async Task<List<TrackResponse>> GenerateQueue(string trackId, string collectionId, CollectionType type, int position, bool shuffle, int userId)
    {
        List<TrackResponse> queue = type switch
        {
            //CollectionType.Album => await GenerateAlbumQueue(),
            //CollectionType.Playlist => await GeneratePlaylistQueue(),
            CollectionType.Files => await GenerateFilesQueue(userId),
            CollectionType.Search => await GenerateSingleTrackQueue(trackId, userId),
            _ => await GenerateSingleTrackQueue(trackId, userId),
        };

        if (queue.Count == 0)
        {
            throw new ApiError(HttpStatusCode.InternalServerError, "Unexpected Server Error");
        }

        return queue;
    }

    private async Task<List<TrackResponse>> GenerateFilesQueue(int userId)
    {
        return await _trackService.GetUserTracks(userId);
    }

    private async Task<List<TrackResponse>> GenerateSingleTrackQueue(string trackId, int userId)
    {
        return new List<TrackResponse>
        {
            await _trackService.Get(trackId, userId)
        };
    }
}