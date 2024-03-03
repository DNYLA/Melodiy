namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Image.Entities;
using Melodiy.Features.Image.Models;
using Melodiy.Features.Playlist.Entities;
using Melodiy.Features.Playlist.Models;
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
            //Tracks = new(),
            User = album.User?.ToResponse(),
            Image = album.Image?.ToResponse(),
            ExternalDetails = new ExternalAlbumDetails
            {
                SpotifyId = album.SpotifyId
            }
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
            Tracks = new(),
            User = playlist.User.ToResponse(),
            Image = playlist.Image?.ToResponse(),
            CreatedAt = playlist.CreatedAt
        };
    }

    public static UserResponse ToResponse(this User user)
    {
        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}