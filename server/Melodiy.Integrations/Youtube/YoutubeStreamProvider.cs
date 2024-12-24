using System.Net;
using Microsoft.Extensions.Caching.Memory;

namespace Melodiy.Integrations.Youtube;

using Melodiy.Integrations.Common;
using Melodiy.Integrations.Common.Stream;

using System.Text.RegularExpressions;

using YoutubeExplode;
using YoutubeExplode.Videos.Streams;

using YoutubeSearchApi.Net.Models.Youtube;
using YoutubeSearchApi.Net.Services;

public partial class YoutubeStreamProvider(IMemoryCache memoryCache) : IStreamProvider
{
    private readonly Regex _officialFlag = VideoTitleRegex();

    public async Task<ExternalStreamResponse> GetBestMatch(string title, List<string> artists, int durationMs)
    {
        var searchTerm = $"{title} - {string.Join(',', artists)}";
        var videos = await Search(searchTerm);
        var bestResult = GetBestVideo(videos, artists, title, durationMs);

        if (bestResult == null)
        {
            throw new Exception("Track not found");
        }

        var successfullyConvertedDuration = int.TryParse(bestResult.Duration, out var duration);

        return new ExternalStreamResponse
        {
            Id = bestResult.Id,
            DurationMs = successfullyConvertedDuration ? duration : 0,
            Source = SourceType.Youtube
        };
    }

    public async Task<string> GetStream(string id)
    {
        try
        {
            var key = $"youtube-stream-{id}";
            if (memoryCache.TryGetValue(key, out string? value) && !string.IsNullOrWhiteSpace(value))
            {
                return value;
            }

            var youtube = new YoutubeClient();

            var streamManifest = await youtube.Videos.Streams.GetManifestAsync(id);

            var url = streamManifest
                   .GetAudioStreams()
                   .Where(s => s.Container == Container.Mp3 || s.Container == Container.Mp4)
                   .GetWithHighestBitrate().Url;

            if (string.IsNullOrWhiteSpace(url)) throw new Exception("Unable to find stream id");
            memoryCache.Set(key, url, TimeSpan.FromHours(5.5)); //Each link generated lasts for 6 hours

            return url;
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return string.Empty;
        }

    }

    private static async Task<List<YoutubeVideo>> Search(string term)
    {
        using HttpClient httpClient = new();
        var client = new YoutubeSearchClient(httpClient);
        var responseObject = await client.SearchAsync(term);

        return responseObject.Results.ToList();
    }

    private YoutubeVideo? GetBestVideo(List<YoutubeVideo> videos, List<string> artists, string title, int durationMs)
    {
        artists = artists.Select(a => a.ToLower()).ToList();

        YoutubeVideo? bestResult = null;
        var highestScore = 0;

        foreach (var video in videos)
        {
            var score = 0;

            var isCorrectTitle = video.Title.Contains(title);
            var isOfficial = _officialFlag.IsMatch(video.Title);
            var isValidTime = TimeSpan.TryParseExact(video.Duration, @"m\:ss", null, out var videoDuration);
            var isExplicit =
                video.Title.ToLower().Contains("explicit"); //TODO: Move to param and then increase score based on param

            foreach (var artist in artists)
            {
                var isSameChannel = video.Author.ToLower().Contains(artist);
                var titleContainsArtist = video.Title.ToLower().Contains(artist);

                score += isSameChannel
                             ? 2
                             : 0; //Correct channel should take priority over correct title as search results will already contain a similar result to search term/trackname.
                score += titleContainsArtist ? 1 : 0;
            }

            score += isCorrectTitle ? 1 : 0;
            score += isOfficial ? 1 : 0;
            score += isCorrectTitle && isOfficial ? 2 : 0;
            score += isExplicit ? 3 : 0;

            if (isValidTime)
            {
                var durationDifference = Math.Abs((int)videoDuration.TotalMilliseconds - durationMs) / 1000;

                //Give 4 Points if duration below <=5 seconds or give 1 point if <= 15secs
                score += durationDifference <= 5 ? 3 : 0;
                score += durationDifference <= 15 ? 1 : 0;
            }

            if (score > highestScore)
            {
                bestResult = video;
                highestScore = score;
            }
        }

        return bestResult;
    }

    [GeneratedRegex("official\\s(video|audio|music\\svideo|lyric\\svideo|visualizer)", RegexOptions.IgnoreCase,
                    "en-GB")]
    private static partial Regex VideoTitleRegex();
}