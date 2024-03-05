namespace Melodiy.Features.Search;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Common.Extensions;
using Melodiy.Features.Search.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Net;

[ApiController]
[Route("[controller]")]
public class SearchController(ISearchService searchService, IUserService userService) : ControllerBase
{
    private readonly ISearchService _searchService = searchService;

    private readonly IUserService _userService = userService;

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<SearchResultViewModel>> Search([FromQuery] string term, [FromQuery] string? artistId,
                                                                  [FromQuery] SearchType? type)
    {
        var user = await _userService.GetUserDetails();

        if (user == null)
        {
            throw new ApiException(HttpStatusCode.Unauthorized);
        }

        type ??= SearchType.All;
        if (term.Length < 3)
            throw new ApiException(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");

        var result = new SearchResultViewModel();

        if (type == SearchType.Album)
        {
            if (string.IsNullOrWhiteSpace(artistId))
                throw new ApiException(HttpStatusCode.BadRequest,
                                       "ArtistId is required when searching for your albums created by an artist");

            var response = await _searchService.SearchAlbumsCreatedByUser(term, artistId, user.Id);
            result.Albums = response.Select(album => album.ToViewModel()).ToList();
        }
        else
        {
            throw new ApiException(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return result;
    }

    [HttpGet]
    public async Task<ActionResult<SearchResultViewModel>> Search([FromQuery] string term, [FromQuery] SearchType? type)
    {
        type ??= SearchType.All;
        if (term.Length < 3)
            throw new ApiException(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");

        var results = new SearchResultViewModel();

        switch (type)
        {
            case SearchType.All:
            {
                var response = await _searchService.Search(term);

                return new SearchResultViewModel
                {
                    Albums = response.Albums.Select(album => album.ToViewModel()).ToList(),
                    Artists = response.Artists.Select(artist => artist.ToViewModel()).ToList(),
                    Tracks = response.Tracks.Select(track => track.ToViewModel()).ToList()
                };
            }
            case SearchType.Artist:
            {
                var response = await _searchService.SearchArtist(term);
                results.Artists = response.Select(artist => artist.ToViewModel()).ToList();
                break;
            }
            default:
                throw new ApiException(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return results;
    }
}