namespace Melodiy.Features.Search;

using System.Net;

using MediatR;

using Melodiy.Features.Album.Query;
using Melodiy.Features.Artist.Query;
using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Search.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SearchController(ISearchService searchService, IUserService userService, IMediator mediator)
    : ControllerBase
{
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<SearchResultViewModel>> Search([FromQuery] string term, [FromQuery] string? artistId,
        [FromQuery] SearchType? type)
    {
        var user = await userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        type = ValidateSearchRequest(term, type);
        var result = new SearchResultViewModel();

        switch (type)
        {
            case SearchType.Album when string.IsNullOrWhiteSpace(artistId):
                throw new ApiException(HttpStatusCode.BadRequest,
                    "ArtistId is required when searching for your albums created by an artist");
            case SearchType.Album:
            {
                var response = await mediator.Send(new SearchAlbumsQuery(term, 5, artistId, user.Id));
                result.Albums = response.Select(album => album.ToViewModel()).ToList();
                break;
            }
            default:
                throw new ApiException(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return result;
    }

    [HttpGet]
    public async Task<ActionResult<SearchResultViewModel>> Search([FromQuery] string term, [FromQuery] SearchType? type)
    {
        type = ValidateSearchRequest(term, type);
        var results = new SearchResultViewModel();

        switch (type)
        {
            case SearchType.All:
            {
                var response = await searchService.Search(term);

                return new SearchResultViewModel
                {
                    Albums = response.Albums.Select(album => album.ToViewModel()).ToList(),
                    Artists = response.Artists.Select(artist => artist.ToViewModel()).ToList(),
                    Tracks = response.Tracks.Select(track => track.ToViewModel()).ToList()
                };
            }
            case SearchType.Artist:
            {
                var response = await mediator.Send(new SearchArtistsQuery(term, 5, true));
                results.Artists = response.Select(artist => artist.ToViewModel()).ToList();
                break;
            }
            default:
                throw new ApiException(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return results;
    }

    private static SearchType ValidateSearchRequest(string? term, SearchType? type)
    {
        if (string.IsNullOrWhiteSpace(term) || term.Length < 3)
            throw new ApiException(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");

        return type ?? SearchType.All;
    }
}