using melodiy.server.Dtos.Search;
using melodiy.server.Providers.Search;
using Microsoft.AspNetCore.Mvc;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        private readonly ISearchProvider _spotifyProvider;

        public TestController(ISearchProvider spotifyProvider)
        {
            _spotifyProvider = spotifyProvider;
        }

        [HttpGet()]
        public async Task<ActionResult<ServiceResponse<SearchResults>>> RunTest()
        {
            SearchResults res = await _spotifyProvider.Search("Roddy Ricch", 5);
            ServiceResponse<SearchResults> serviceRes = new()
            {
                Data = res
            };

            return serviceRes;

        }
    }
}