namespace Melodiy.Features.Search;

using Melodiy.Features.Artist.Entities;
using Melodiy.Features.Search.Models;
using Melodiy.Features.Track.Models;
using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.Search;

public interface IExternalSearchFactory
{
    Task<SearchResult> Search(string term, ExternalSearchType? type, int limit = 10);

    Task<List<TrackResponse>> GetAlbumTracks(string id);

    Task<Artist> UpdateArtist(Artist artist, string externalId);

    SourceType GetSourceType();
}