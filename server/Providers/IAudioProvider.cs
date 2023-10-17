using YoutubeSearchApi.Net.Models.Youtube;

namespace melodiy.server.Providers
{
    public interface IAudioProvider
    {
        //TODO: Should not return YoutubeVideo instead return id + duration?
        Task<YoutubeVideo> Find(string track, List<string> artists, int durationMs);
        Task<string> GetStream(string id);
    }
}