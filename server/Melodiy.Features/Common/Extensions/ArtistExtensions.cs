namespace Melodiy.Features.Common.Extensions;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;

public static class ArtistExtensions
{
    public static ArtistResponse ConvertToResponse(this Artist? artist)
    {
        if (artist == null)
        {
            return new ArtistResponse();
        }

        return new ArtistResponse
        {
            Id = artist.Id,
            Slug = artist.Slug,
            Name = artist.Name,
            Verified = artist.Verified,
            ExternalDetails = new ExternalArtistDetails
            {
                SpotifyId = artist.SpotifyId
            },
            User = artist.User.ConvertToResponse(),
            Image = artist.Image.ConvertToImageResponse(),
            CreatedAt = artist.CreatedAt,
            //Description = artist.Description
            //MonthlyListeners = artist.MonthlyListeners,
        };
    }

    public static ArtistDetails ConvertToArtistDetails(this Artist? artist)
    {
        if (artist == null)
        {
            return new ArtistDetails();
        }

        return new ArtistDetails();

        //        return new ArtistDetails()
        //        {
        //Id = artist.Id,
        //Slug = artist.Slug,
        //Name = artist.Name,
        //Verified = artist.Verified,
        //SpotifyId = artist.SpotifyId,
        //User = artist.User.ConvertToResponse(),
        //Image = artist.Image.ConvertToImageResponse(),
        //CreatedAt = artist.CreatedAt,
        //Description = artist.Description
        //MonthlyListeners = artist.MonthlyListeners,
        //            UserAlbums = artist.
        //    public int Id { get; set; }

        //    public string Slug { get; set; } = string.Empty;

        //    public string Name { get; set; } = string.Empty;

        //    public bool Verified { get; set; }

        //    public string? SpotifyId { get; set; }

        //    public UserResponse? User { get; set; } = null!;

        //    public ImageResponse? Image { get; set; }

        //    public DateTime CreatedAt { get; set; }

        //    public string? Description { get; set; }

        //    public int MonthlyListeners { get; set; }

        //    public List<AlbumResponse> UserAlbums { get; set; } = new();

        //    public List<AlbumResponse> Albums { get; set; } = new();

        //    public List<AlbumResponse> Singles { get; set; } = new();

        //    public List<TrackResponse> TopTracks { get; set; } = new();
        //}
    }
}