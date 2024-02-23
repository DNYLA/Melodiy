
namespace Melodiy.Application.Services.PlayerService;
using Melodiy.Application.Common.Extensions;

using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Common.Interfaces.Services;
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.Playlist;
using Melodiy.Application.Services.TrackService;

using System.Net;


public class PlayerService : IPlayerService
{
    private readonly ITrackService _trackService;
    private readonly IDateTimeProvider _dateProvider;
    private readonly IDataContext _context;
    private readonly IPlaylistService _playlistService;
    private readonly IAlbumService _albumService;
    private static readonly Dictionary<int, PlayerHistory> _userHistory = new(); //Stored as Dictionary<UserId, PlayerHistory>();

    public PlayerService(ITrackService trackService, IDateTimeProvider dateProvider, IDataContext context, IPlaylistService playlistService, IAlbumService albumService)
    {
        _trackService = trackService;
        _dateProvider = dateProvider;
        _context = context;
        _playlistService = playlistService;
        _albumService = albumService;
    }

    public async Task<PlayerResponse> Play(string trackId, CollectionType collectionType, string collectionId, PlayerType playerType, PlayerMode mode, UserClaims? claims)
    {
        if (claims == null)
        {
            //Currently only files are implemented which require auth
            // throw new ApiError(HttpStatusCode.Unauthorized, "You must be logged in to play a track");
            // if (trackId == null) throw new ApiError(HttpStatusCode.BadRequest, "A TrackId must be provided if you aren't logged in");
            // //Guests don't have a track history
            // var guestTrack = await _trackService.Get(trackId, null, true);
            var guestTrack = await _trackService.Get(trackId, null);
            guestTrack.FilePath = await _trackService.GetTrackPath(guestTrack.Id, null);

            return new PlayerResponse
            {
                CurrentTrack = guestTrack,
                Queue = new List<TrackPreview> { guestTrack.Adapt<TrackPreview>() }
            };
        }


        //TODO: Check if current queue is RepeatTrack

        //TODO: Check if Current queue is at the end and is Repeat

        //TODO: Play the next track in the queue

        var queue = await GenerateQueue(trackId, collectionId, collectionType, claims.Id);
        var position = queue.FindIndex(t => t.Slug == trackId);

        if (queue.Count == 0)
        {
            throw new ApiError(HttpStatusCode.NotFound, "No Tracks found");
        }


        if (position > queue.Count - 1 && mode.Equals(PlayerMode.Repeat))
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
            CollectionType = collectionType,
            Type = playerType,
            Mode = PlayerMode.NoRepeat,
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
        _userHistory.TryGetValue(claims.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, type, collectionId, PlayerType.Normal, PlayerMode.NoRepeat, claims);
        }

        curHistory.Position--;
        if (curHistory.Position < 0)
        {
            curHistory.Position = 0;
        }
        else if (curHistory.Position == 0 && curHistory.Mode == PlayerMode.Repeat)
        {
            //If Repeat is enabled we go back to the last track in the queue otherwise we stay at track 0;
            curHistory.Position = curHistory.Queue.Count - 1;
        }

        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
        track.FilePath = await _trackService.GetTrackPath(track.Id, claims?.Id);

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
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList().Adapt<List<TrackPreview>>();

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = clientQueue,
        };
    }

    public async Task<PlayerResponse> Next(string trackId, string collectionId, CollectionType type, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, type, collectionId, PlayerType.Normal, PlayerMode.NoRepeat, claims);
        }

        if (curHistory.Mode.Equals(PlayerMode.RepeatTrack))
        {
            var curTrack = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
            curTrack.FilePath = await _trackService.GetTrackPath(curTrack.Id, claims?.Id);

            return new PlayerResponse
            {
                CurrentTrack = curTrack,
                Queue = curHistory.Queue.Skip(curHistory.Position + 1).ToList().Adapt<List<TrackPreview>>(),
            };
        }
        
        curHistory.Position++;

        if (curHistory.Position > curHistory.Queue.Count - 1)
        {
            switch (curHistory.Mode)
            {
                case PlayerMode.NoRepeat:
                    //TODO: return empty Queue with prevTrack
                    var curTrack = await _trackService.Get(curHistory.Queue[curHistory.Position - 1].Slug, claims.Id, true);
                    curTrack.FilePath = await _trackService.GetTrackPath(curTrack.Id, claims?.Id);

                    return new PlayerResponse
                    {
                        CurrentTrack = curTrack,
                        Queue = new List<TrackPreview>(),
                    };
                case PlayerMode.Repeat:
                    curHistory.Position = 0;
                    break;
            }
        }

        //Log Current Track
        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
        track.FilePath = await _trackService.GetTrackPath(track.Id, claims?.Id);

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
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList().Adapt<List<TrackPreview>>();

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = clientQueue,
        };
    }

    public async Task<PlayerResponse> Shuffle(string trackId, string collectionId, CollectionType collectionType, PlayerType playerType, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != collectionType || playerType.Equals(PlayerType.Normal))
        {
            return await Play(trackId, collectionType, collectionId, PlayerType.Normal, curHistory?.Mode ?? PlayerMode.NoRepeat, claims);
        }

        //Log Current Track
        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
        track.FilePath = await _trackService.GetTrackPath(track.Id, claims?.Id);

        var shuffledQueue = curHistory.Queue.Shuffle();
        var position = shuffledQueue.FindIndex(t => t.Id == track.Id);
        shuffledQueue.MoveToFirst(position);

        curHistory.Queue = shuffledQueue;
        curHistory.Position = 0;
        curHistory.Type = playerType;

        _userHistory[claims.Id] = curHistory;

        //Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(1).ToList().Adapt<List<TrackPreview>>();

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = clientQueue,
        };
    }

    public async Task<PlayerResponse> Mode(string trackId, string collectionId, CollectionType type, PlayerMode mode, UserClaims claims)
    {
        _userHistory.TryGetValue(claims.Id, out PlayerHistory? curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.CollectionType != type)
        {
            return await Play(trackId, type, collectionId, PlayerType.Normal, mode, claims);
        }

        //Log Current Track
        var track = await _trackService.Get(curHistory.Queue[curHistory.Position].Slug, claims.Id, true);
        track.FilePath = await _trackService.GetTrackPath(track.Id, claims?.Id);
        
        curHistory.Mode = mode;
        _userHistory[claims.Id] = curHistory;

        //Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList().Adapt<List<TrackPreview>>();

        return new PlayerResponse
        {
            CurrentTrack = track,
            Queue = clientQueue,
        };
    }


    private async Task<List<TrackResponse>> GenerateQueue(string trackId, string collectionId, CollectionType collectionType, int userId)
    {
        List<TrackResponse> queue = collectionType switch
        {
            //Causes a weird bug where the album is deleted not sure why.
            CollectionType.Album => await GenerateAlbumQueue(collectionId),
            CollectionType.Playlist => await GeneratePlaylistQueue(collectionId, userId),
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

    private async Task<List<TrackResponse>> GeneratePlaylistQueue(string playlistId, int userId)
    {
        var playlist = await _playlistService.Get(playlistId, userId);

        return playlist.Tracks;
    }

    private async Task<List<TrackResponse>> GenerateAlbumQueue(string playlistId)
    {
        var album = await _albumService.Get(playlistId);

        return album.Tracks;
    }
}