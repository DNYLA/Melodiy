namespace Melodiy.Features.Search;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Search.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Integrations.Common;

public interface IExternalSearchFactory
{
    Task<SearchResult> Search(string term, int limit = 10);

    Task<List<TrackResponse>> GetAlbumTracks(string id);

    Task<Artist> UpdateArtist(Artist artist, string externalId);

    SourceType GetSourceType();
}