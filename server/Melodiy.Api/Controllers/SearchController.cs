using System.Net;
using Melodiy.Application.Common.Errors;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Controllers;

public class SearchResult
{
    public int Id { get; set; }
    public string Name { get; set; }
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
    // private readonly ISearchService _SearchService;
    // public SearchController(ISearchService SearchService)
    // {
    //     _SearchService = SearchService;
    // }


    [HttpGet()]
    public async Task<ActionResult<List<SearchResult>>> Search([FromQuery] string term, [FromQuery] SearchType? type)
    {
        type ??= SearchType.All;
        if (type != SearchType.Artist) throw new ApiError(HttpStatusCode.NotImplemented, "Currently Not implemented");
        if (term.Length < 3) throw new ApiError(HttpStatusCode.BadRequest, "Search term must contain a minimum of three characters");

        var results = new List<SearchResult>()
        {
            new()
            {
                Id = 1,
                Name =  term + " Fery",
            },
            new()
            {
                Id = 2,
                Name =  term,
            },
            new()
            {
                Id = 3,
                Name =  term + "123",
            }
        };

        return results;
    }
}