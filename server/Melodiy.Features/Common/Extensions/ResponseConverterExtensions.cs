namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.Track.Entities;
using Melodiy.Features.Track.Models;
using Melodiy.Features.User.Entities;
using Melodiy.Features.User.Models;

public static class ResponseConverterExtensions
{
    public static AlbumResponse ToResponse(this Album album)
    {
        return new AlbumResponse
        {
            Id = album.Id,
            Slug = album.Slug,
            Title = album.Title,
            Verified = album.Verified,
            Type = album.Type,
            ReleaseDate = album.ReleaseDate,
            CreatedAt = album.CreatedAt,
            Artists = album.Artists.Select(artist => artist.ToResponse()).ToList(),
            User = album.User?.ToResponse(),
            Image = album.Image?.ToResponse(),
            ExternalDetails = new ExternalAlbumDetails
            {
                SpotifyId = album.SpotifyId
            }
        };
    }

    public static ArtistResponse ToResponse(this TrackArtist trackArtist)
    {
        if (trackArtist.Artist == null)
        {
            return new ArtistResponse
            {
                Id = trackArtist.ArtistId
            };
        }

        return new ArtistResponse
        {
            Id = trackArtist.ArtistId,
            Slug = trackArtist.Artist.Slug,
            Name = trackArtist.Artist.Name,
            Verified = trackArtist.Artist.Verified,
            User = trackArtist.Artist.User?.ToResponse(),
            Image = trackArtist.Artist.Image?.ToResponse(),
            CreatedAt = trackArtist.Artist.CreatedAt,
            //Description = artist.Description
            //MonthlyListeners = artist.MonthlyListeners,
            ExternalDetails = new ExternalArtistDetails
            {
                SpotifyId = trackArtist.Artist.SpotifyId
            },
        };
    }

    public static ArtistResponse ToResponse(this Artist artist)
    {
        return new ArtistResponse
        {
            Id = artist.Id,
            Slug = artist.Slug,
            Name = artist.Name,
            Verified = artist.Verified,
            User = artist.User?.ToResponse(),
            Image = artist.Image?.ToResponse(),
            CreatedAt = artist.CreatedAt,
            //Description = artist.Description
            //MonthlyListeners = artist.MonthlyListeners,
            ExternalDetails = new ExternalArtistDetails
            {
                SpotifyId = artist.SpotifyId
            },
        };
    }

    public static ImageResponse? ToResponse(this Image? image)
    {
        if (image == null)
        {
            return null;
        }

        return new ImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            Path = image.Path,
            Source = image.Source,
            UserId = image.UserId
        };
    }

    public static PlaylistResponse ToResponse(this Playlist playlist)
    {
        return new PlaylistResponse
        {
            Id = playlist.Id,
            Slug = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            User = playlist.User.ToResponse(),
            Image = playlist.Image?.ToResponse(),
            CreatedAt = playlist.CreatedAt,
        };
    }

    public static TrackResponse ToResponse(this Track track)
    {
        return new TrackResponse
        {
            Id = track.Id,
            Slug = track.Slug,
            Title = track.Title,
            Views = track.Views,
            Public = track.Public,
            Encrypted = track.Encrypted,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            CreatedAt = track.CreatedAt,
            Album = track.AlbumTrack?.Album?.ToResponse(),
            Artists = track.TrackArtists.Select(artist => artist.ToResponse()).ToList(),
            User = track.User?.ToResponse(),
            Image = track.Image?.ToResponse(),
            Source = track.Source,
            ExternalDetails = new ExternalTrackDetails()
            {
                Path = track.Path,
                SpotifyId = track.SpotifyId,
                YoutubeId = track.YoutubeId,
                Source = track.Source
            }
        };
    }

    public static UserResponse ToResponse(this User? user)
    {
        if (user == null)
        {
            return new UserResponse();
        }

        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}