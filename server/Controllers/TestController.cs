using melodiy.server.Dtos.Search;
using melodiy.server.Providers;
using melodiy.server.Providers.Search;
using Microsoft.AspNetCore.Mvc;
using YoutubeSearchApi.Net.Models.Youtube;

namespace melodiy.server.Controllers
{
    [CheckStatusCode]
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        private readonly ISearchProvider _searchProvider;
        private readonly IAudioProvider _streamProvider;

        public TestController(ISearchProvider searchProvider, IAudioProvider streamProvider)
        {
            _searchProvider = searchProvider;
            _streamProvider = streamProvider;
        }

        [HttpGet()]
        public async Task<ActionResult<ServiceResponse<SearchResults>>> RunTest()
        {
            SearchResults res = await _searchProvider.Search("Roddy Ricch", 5);
            ServiceResponse<SearchResults> serviceRes = new()
            {
                Data = res
            };

            return serviceRes;

        }

        [HttpGet("youtube")]
        public async Task<ActionResult<ServiceResponse<string>>> Youtube()
        {
            YoutubeVideo video = await _streamProvider.Find("Die Young", new List<string> { "Roddy Ricch" }, 166000);
            ServiceResponse<string> serviceRes = new()
            {
                Data = video.Url
            };
            Console.WriteLine("Here");
            return serviceRes;

        }
    }
}