using System.Net;
using Melodiy.Api.Attributes;
using Melodiy.Application.Common;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Services.SearchService;
using Melodiy.Contracts.Album;
using Melodiy.Contracts.Artist;
using Melodiy.Contracts.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

public class SearchResult
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
}

public enum SearchType
{
    Album,
    Artist,
    Track,
    All
}

[ApiController]
[Route("[controller]")]
public class SearchController : ControllerBase
{
    private readonly ISearchService _searchService;
    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }


    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<SearchResponse>> Search([FromQuery] string term, [FromQuery] string? artistId, [FromQuery] SearchType? type, [FromClaims] UserClaims user)
    {
        type ??= SearchType.All; //If no type provided search all
        if (term.Length < 3) throw new ApiError(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");

        var result = new SearchResponse();

        if (type == SearchType.Album)
        {
            var response = await _searchService.SearchAlbumsCreatedByUser(term, artistId, user.Id, 5);
            result.Albums = response.Adapt<List<GetAlbumResponse>>();
        }
        else
        {
            throw new ApiError(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return result;
    }

    [HttpGet]
    public async Task<ActionResult<SearchResponse>> Search([FromQuery] string term, [FromQuery] SearchType? type)
    {
        type ??= SearchType.All; //If no type provided search all
        if (term.Length < 3) throw new ApiError(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");
        var results = new SearchResponse();

        if (type == SearchType.Artist)
        {
            var response = await _searchService.SearchArtist(term);
            results.Artists = response.Adapt<List<GetArtistResponse>>();
        }
        else
        {
            throw new ApiError(HttpStatusCode.NotImplemented, $"SearchType: {type} currently not accepted.");
        }

        return results;
    }
}