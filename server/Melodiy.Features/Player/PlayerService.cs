namespace Melodiy.Features.Player;

using MediatR;

using Melodiy.Features.Album.Query;
using Melodiy.Features.Common.Enums;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Common.Services;
using Melodiy.Features.Player.Enums;
using Melodiy.Features.Player.Models;
using Melodiy.Features.Playlist;
using Melodiy.Features.Track.Models;
using Melodiy.Features.Track.Query;
using Melodiy.Features.User.Models;

using System.Net;

public sealed class PlayerService(IDateTimeProvider dateProvider, IPlaylistService playlistService, IMediator mediator)
    : IPlayerService
{
    private readonly IDateTimeProvider _dateProvider = dateProvider;

    private readonly IPlaylistService _playlistService = playlistService;

    private readonly IMediator _mediator = mediator;

    private static readonly Dictionary<int, PlayerHistory>
        UserHistory = new(); //Stored as Dictionary<UserId, PlayerHistory>();


    public async Task<PlayerViewModel> Play(string trackId, CollectionType collection, string collectionId,
                                            PlayerShuffle shuffle, PlayerMode mode,
                                            UserResponse? user)
    {
        if (user == null)
        {
            return await GenerateGuestQueue(trackId);
        }

        //TODO: Check if current queue is RepeatTrack

        //TODO: Check if Current queue is at the end and is Repeat

        var queue = await GenerateQueue(trackId, collectionId, collection, user.Id);
        var position = queue.FindIndex(x => x.Slug == trackId);

        if (queue.Count == 0)
        {
            throw new ApiException(HttpStatusCode.NotFound, "No Tracks found");
        }


        if (position > queue.Count - 1 && mode.Equals(PlayerMode.Repeat))
        {
            position = 0; //Reset to start of queue;
        }

        var currentQueueTrack = queue[position];
        var track = await _mediator.Send(new GetTrackQuery(currentQueueTrack.Slug, user.Id, true, true)) ??
                    throw new ApiException(HttpStatusCode.NotFound);

        //TODO: If Shuffle then Shuffle

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
            Collection = collection,
            Shuffle = shuffle,
            Mode = PlayerMode.NoRepeat,
            CurrentTrack = curTrack,
            Queue = queue.Select(x => x.ToViewModel()).ToList()
        };

        UserHistory[user.Id] = newHistory;

        //Server Queue and Client Queue are separate
        //Server Queue = Queue of full playlist from start - finish (Could be shuffled)
        //Client Queue = List of Next Tracks that will play
        var clientQueue = queue.Skip(position + 1).Select(x => x.ToViewModel()).ToList();

        return new PlayerViewModel
        {
            CurrentTrack = track.ToFullViewModel(),
            Queue = clientQueue,
        };
    }

    public async Task<PlayerViewModel> Previous(string trackId, string collectionId, CollectionType collection,
                                                UserResponse user)
    {
        UserHistory.TryGetValue(user.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.Collection != collection)
        {
            return await Play(trackId, collection, collectionId, PlayerShuffle.Normal, PlayerMode.NoRepeat, user);
        }

        curHistory.Position--;
        if (curHistory.Position < 0)
        {
            curHistory.Position = 0;
        }
        else if (curHistory is { Position: 0, Mode: PlayerMode.Repeat })
        {
            //If Repeat is enabled we go back to the last track in the queue otherwise we stay at track 0;
            curHistory.Position = curHistory.Queue.Count - 1;
        }

        var track = await _mediator.Send(
                        new GetTrackQuery(curHistory.Queue[curHistory.Position].Id, user.Id, true, true));
        curHistory.CurrentTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        UserHistory[user.Id] = curHistory;

        //TODO: Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database + Last.fm
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList();

        return new PlayerViewModel
        {
            CurrentTrack = track.ToFullViewModel(),
            Queue = clientQueue,
        };
    }

    public async Task<PlayerViewModel> Next(string trackId, string collectionId, CollectionType collection,
                                            UserResponse user)
    {
        UserHistory.TryGetValue(user.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.Collection != collection)
        {
            return await Play(trackId, collection, collectionId, PlayerShuffle.Normal, PlayerMode.NoRepeat, user);
        }

        if (curHistory.Mode.Equals(PlayerMode.RepeatTrack))
        {
            var curTrack =
                await _mediator.Send(new GetTrackQuery(curHistory.Queue[curHistory.Position].Id, user.Id, true, true));

            return new PlayerViewModel
            {
                CurrentTrack = curTrack.ToFullViewModel(),
                Queue = curHistory.Queue.Skip(curHistory.Position + 1).ToList()
            };
        }

        curHistory.Position++;
        if (curHistory.Position > curHistory.Queue.Count - 1)
        {
            switch (curHistory.Mode)
            {
                case PlayerMode.NoRepeat:
                    //TODO: return empty Queue with no track
                    var nextTrack =
                        await _mediator.Send(
                            new GetTrackQuery(curHistory.Queue[curHistory.Position - 1].Id, user.Id, true, true));

                    return new PlayerViewModel
                    {
                        CurrentTrack = nextTrack.ToFullViewModel(),
                        Queue = new List<TrackViewModel>()
                    };
                case PlayerMode.Repeat:
                    curHistory.Position = 0;
                    break;
            }
        }

        //Log Current Track
        var track = await _mediator.Send(
                        new GetTrackQuery(curHistory.Queue[curHistory.Position].Id, user.Id, true, true));
        curHistory.CurrentTrack = new CurrentTrackLog
        {
            Id = track.Id,
            Slug = track.Slug,
            Duration = track.Duration,
            StartedListening = _dateProvider.UtcNow,
        };

        UserHistory[user.Id] = curHistory;

        //TODO: Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database + Last.fm
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList();

        return new PlayerViewModel
        {
            CurrentTrack = track.ToFullViewModel(),
            Queue = clientQueue,
        };
    }

    public async Task<PlayerViewModel> Shuffle(string trackId, string collectionId, CollectionType collection,
                                               PlayerShuffle shuffle,
                                               UserResponse user)
    {
        UserHistory.TryGetValue(user.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.Collection != collection ||
            !shuffle.Equals(PlayerShuffle.Shuffle))
        {
            return await Play(trackId, collection, collectionId, PlayerShuffle.Normal,
                              curHistory?.Mode ?? PlayerMode.NoRepeat, user);
        }

        //Log Current Track
        var track = await _mediator.Send(
                        new GetTrackQuery(curHistory.Queue[curHistory.Position].Id, user.Id, true, true));
        var shuffledQueue = curHistory.Queue.Shuffle();
        var position = shuffledQueue.FindIndex(x => x.Id == track.Slug);
        shuffledQueue.MoveToFirst(position);

        curHistory.Queue = shuffledQueue;
        curHistory.Position = 0;
        curHistory.Shuffle = shuffle;

        UserHistory[user.Id] = curHistory;

        //TODO: Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(1).ToList();

        return new PlayerViewModel
        {
            CurrentTrack = track.ToFullViewModel(),
            Queue = clientQueue,
        };
    }

    public async Task<PlayerViewModel> Mode(string trackId, string collectionId, CollectionType collection,
                                            PlayerMode mode,
                                            UserResponse user)
    {
        UserHistory.TryGetValue(user.Id, out var curHistory);

        //Generate a new Queue if we have inconsistent values.
        if (curHistory == null || curHistory.CollectionId != collectionId || curHistory.Collection != collection)
        {
            return await Play(trackId, collection, collectionId, PlayerShuffle.Normal, mode, user);
        }

        //Log Current Track
        var track = await _mediator.Send(
                        new GetTrackQuery(curHistory.Queue[curHistory.Position].Id, user.Id, true, true));
        curHistory.Mode = mode;
        UserHistory[user.Id] = curHistory;

        //TODO: Validate if StartedTime + Duration >= DateNow.Utc()
        //True: Log to Database
        //False: Ignore
        var clientQueue = curHistory.Queue.Skip(curHistory.Position + 1).ToList();

        return new PlayerViewModel
        {
            CurrentTrack = track.ToFullViewModel(),
            Queue = clientQueue,
        };
    }

    private async Task<List<TrackResponse>> GenerateQueue(string trackId, string collectionId,
                                                          CollectionType collection, int userId)
    {
        var queue = collection switch
        {
            CollectionType.Album => await GenerateAlbumQueue(collectionId),
            CollectionType.Playlist => await GeneratePlaylistQueue(collectionId, userId),
            CollectionType.Files => await GenerateFilesQueue(userId),
            CollectionType.Search => await GenerateSingleTrackQueue(trackId, userId),
            _ => await GenerateSingleTrackQueue(trackId, userId),
        };

        if (queue.Count == 0)
        {
            throw new ApiException(HttpStatusCode.InternalServerError, "Unexpected Server Error");
        }

        return queue;
    }

    private async Task<List<TrackResponse>> GenerateFilesQueue(int userId)
    {
        return await _mediator.Send(new GetUserTracksQuery(userId));
    }

    private async Task<List<TrackResponse>> GenerateSingleTrackQueue(string slug, int userId)
    {
        return new List<TrackResponse>
        {
            await _mediator.Send(new GetTrackQuery(slug, userId))
        };
    }

    private async Task<List<TrackResponse>> GeneratePlaylistQueue(string slug, int userId)
    {
        var playlist = await _playlistService.Get(slug, userId);

        return playlist.Tracks;
    }

    private async Task<List<TrackResponse>> GenerateAlbumQueue(string slug)
    {
        var album = await _mediator.Send(new GetAlbumQuery(slug));

        if (album == null)
        {
            throw new ApiException(HttpStatusCode.NotFound, $"Album {slug} not found");
        }

        return album.Tracks;
    }

    private async Task<PlayerViewModel> GenerateGuestQueue(string trackSlug)
    {
        //Guests don't have a track history
        var guestTrack = await _mediator.Send(new GetTrackQuery(trackSlug, null, true, true)) ??
                         throw new ApiException(HttpStatusCode.NotFound);

        return new PlayerViewModel
        {
            CurrentTrack = new FullTrackViewModel()
            {
                Id = guestTrack.Slug,
                Title = guestTrack.Title,
                Views = guestTrack.Views,
                //Public = track.Public,
                Duration = guestTrack.Duration,
                ReleaseDate = guestTrack.ReleaseDate,
                CreatedAt = guestTrack.CreatedAt,
                Album = guestTrack.Album?.ToPreview(),
                Artists = guestTrack.Artists.Select(artist => artist.ToPreview()).ToList(),
                User = guestTrack.User?.ToViewModel(),
                Image = guestTrack.Image.GetUrl(),
                Path = guestTrack.ExternalDetails.Path,
                LocalCdnRequestRequired = false
            },
            Queue = new List<TrackViewModel> { guestTrack.ToViewModel() }
        };
    }
}