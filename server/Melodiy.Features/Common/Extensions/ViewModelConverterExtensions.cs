namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Playlist.Models;
using Melodiy.Features.User.Models;

public static class ViewModelConverterExtensions
{
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
            //Tracks = new(),
            Image = album.Image.GetUrl(),
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

    public static ArtistPreview ToPreview(this ArtistResponse artist)
    {
        return new ArtistPreview
        {
            Id = artist.Slug,
            Name = artist.Name,
            Image = artist.Image.GetUrl(),
        };
    }

    public static PlaylistViewModel ToViewModel(this PlaylistResponse playlist)
    {
        return new PlaylistViewModel
        {
            Id = playlist.Slug,
            Title = playlist.Title,
            Public = playlist.Public,
            Tracks = playlist.Tracks,
            User = playlist.User.ToViewModel(),
            Image = playlist.Image.GetUrl(),
            CreatedAt = playlist.CreatedAt
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