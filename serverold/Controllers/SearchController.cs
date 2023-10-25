using melodiy.server.Dtos.Search;
using melodiy.server.Services.SearchService;
using Microsoft.AspNetCore.Mvc;

public class GeoPoint
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}


namespace melodiy.server.Controllers
{
    [CheckStatusCode]
    [ApiController]
    [Route("[controller]")]
    public class SearchController
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet()]
        public async Task<ActionResult<ServiceResponse<SearchResults>>> Search([FromQuery] string term)
        {
            ServiceResponse<SearchResults> response = await _searchService.Search(term.ToLower());

            return response;
        }
    }
}