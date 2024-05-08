namespace Melodiy.Features.Artist.Query;

using MediatR;

using Melodiy.Features.Album.Entities;
using Melodiy.Features.Album.Models;
using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Artist.Models;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Search;
using Melodiy.Integrations.Common;

public sealed class GetArtistDetailsQueryHandler(
    IArtistRepository artistRepository,
    IExternalSearchFactory externalExternalSearchFactory)
    : IRequestHandler<GetArtistDetailsQuery, ArtistDetails?>
{
    private readonly IArtistRepository _artistRepository = artistRepository;

    private readonly IExternalSearchFactory _externalSearchFactory = externalExternalSearchFactory;

    public async Task<ArtistDetails?> Handle(GetArtistDetailsQuery request, CancellationToken cancellationToken)
    {
        var artist = await _artistRepository.WithAlbums().WithTracks().WithImage().GetBySlugAsync(request.Slug);

        if (artist == null)
            return null;

        //TODO: Switch to method that checks if any are availble e.g spotify, tidal etc.
        //Or move to external search and that can handle it
        if (artist.SpotifyId != null)
        {
            artist = await IndexArtist(artist);
        }

        return GenerateArtistDetails(artist);
    }

    private async Task<Artist> IndexArtist(Artist artist)
    {
        var externalId = GetExternalArtistId(artist);

        if (string.IsNullOrWhiteSpace(externalId))
        {
            return artist;
        }

        return await _externalSearchFactory.UpdateArtist(artist, externalId);
    }

    private string? GetExternalArtistId(Artist artist)
    {
        var source = _externalSearchFactory.GetSourceType();

        return source switch
        {
            SourceType.Spotify => artist.SpotifyId,
            _ => null
        };
    }

    private static ArtistDetails GenerateArtistDetails(Artist artist)
    {
        var albums = FilterAlbum(artist.Albums, x => x is { Type: AlbumType.Album, Verified: true });
        var singles = FilterAlbum(artist.Albums, x => x is { Type: not AlbumType.Album, Verified: true });
        var userAlbums = FilterAlbum(artist.Albums, x => !x.Verified);

        return new ArtistDetails
        {
            Id = artist.Id,
            Slug = artist.Slug,
            Name = artist.Name,
            Verified = artist.Verified,
            User = artist.User?.ToResponse(),
            Image = artist.Image?.ToResponse(),
            CreatedAt = artist.CreatedAt,
            //Description = artist.Description,
            MonthlyListeners = 0,
            Albums = albums,
            UserAlbums = userAlbums,
            Singles = singles,
            TopTracks = artist.TrackArtists.Select(trackArtist => trackArtist.Track.ToResponse()).ToList(),
            ExternalDetails = new ExternalArtistDetails
            {
                SpotifyId = artist.SpotifyId
            },
        };
    }

    private static List<AlbumResponse> FilterAlbum(List<Album> albums, Func<Album, bool> delgate)
    {
        return albums.Where(delgate)
                     .Select(album => album.ToResponse())
                     .OrderByDescending(a => a.ReleaseDate)
                     .ToList();
    }
}