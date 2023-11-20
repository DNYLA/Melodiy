using System.Net;
using Melodiy.Application.Common.Errors;
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
                Image = "https://svmigokmzkjddcixdmzh.supabase.co/storage/v1/object/public/images/Jungaal/29f4c3934d9e482207a43c3748f60983.png",
            },
            new()
            {
                Id = 2,
                Name =  term,
                Image = "https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f"
            },
            new()
            {
                Id = 3,
                Name =  term + "123",
                Image = "https://i.scdn.co/image/ab67616d0000b2738007e1fcf108e4270b6df942"
            },
            new()
            {
                Id = 4,
                Name = "Bobby" + term,
            }
        };

        return results;
    }
}