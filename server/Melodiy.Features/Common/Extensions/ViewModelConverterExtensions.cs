namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Features.User.Models;

public static class ViewModelConverterExtensions
{
    public static AlbumPreview ToPreview(this Album? album)
    {
        if (album == null)
        {
            return new();
        }

        return new AlbumPreview
        {
            Id = album.Slug,
            Title = album.Title,
            Image = album.Image.GetUrl(),
        };
    }

    public static AlbumPreview ToPreview(this AlbumResponse album)
    {
        return new AlbumPreview
        {
            Id = album.Slug,
            Title = album.Title,
            Image = album.Image.GetUrl(),
        };
    }

    public static AlbumViewModel ToViewModel(this AlbumResponse album)
    {
        return new AlbumViewModel
        {
            Id = album.Slug,
            Title = album.Title,
            Verified = album.Verified,
            Type = album.Type,
            ReleaseDate = album.ReleaseDate,
            CreatedAt = album.CreatedAt,
            Artists = album.Artists.Select(artist => artist.ToPreview()).ToList(),
            //Tracks = album.Tracks.Select(track => track.ToViewModel()).ToList(),
            Image = album.Image.GetUrl(),
        };
    }

    public static ArtistPreview ToPreview(this Artist? artist)
    {
        if (artist == null)
        {
            return new ArtistPreview();
        }

        return new ArtistPreview
        {
            Id = artist.Slug,
            Name = artist.Name,
            Image = artist.Image.GetUrl(),
        };
    }

    public static ArtistPreview ToPreview(this ArtistResponse artist)
    {
        return new ArtistPreview
        {
            Id = artist.Slug,
            Name = artist.Name,
            Image = artist.Image.GetUrl(),
        };
    }

    public static ArtistViewModel ToViewModel(this ArtistResponse artist)
    {
        return new ArtistViewModel
        {
            Id = artist.Slug,
            Name = artist.Name,
            Verified = artist.Verified,
            Image = artist.Image.GetUrl(),
            CreatedAt = artist.CreatedAt
        };
    }

    public static PlaylistViewModel ToViewModel(this PlaylistResponse playlist)
    {
        return new PlaylistViewModel
        {
            Id = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            Tracks = playlist.Tracks.Select(track => track.ToViewModel()).ToList(),
            User = playlist.User.ToViewModel(),
            Image = playlist.Image.GetUrl(),
            CreatedAt = playlist.CreatedAt
        };
    }

    public static TrackViewModel ToViewModel(this TrackResponse track)
    {
        return new TrackViewModel
        {
            Id = track.Slug,
            Title = track.Title,
            Views = track.Views,
            //Public = track.Public,
            Duration = track.Duration,
            ReleaseDate = track.ReleaseDate,
            CreatedAt = track.CreatedAt,
            Album = track.Album?.ToPreview(),
            Artists = track.Artists.Select(artist => artist.ToPreview()).ToList(),
            User = track.User?.ToViewModel(),
            Image = track.Image.GetUrl(),
        };
    }

    public static UserViewModel ToViewModel(this UserResponse user)
    {
        return new UserViewModel
        {
            Id = user.Id,
            Username = user.Username,
            Avatar = user.Avatar
        };
    }
}