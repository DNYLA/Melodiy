using Melodiy.Application.Common.Entities;
using Melodiy.Application.Common.Errors;
using Melodiy.Application.Common.Interfaces.Search;
using System.Net;
using System.Text.RegularExpressions;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;
using YoutubeSearchApi.Net.Models.Youtube;
using YoutubeSearchApi.Net.Services;

namespace Melodiy.Infrastructure.Services.Stream;

public partial class YoutubeProvider : IExternalStreamProvider
{
    private readonly Regex officialFlag = VideoTitleRegex();
    public async Task<ExternalStreamResponse> GetBestMatch(string track, List<string> artists, int durationMs)
    {
        string searchTerm = $"{track} - {string.Join(',', artists)}";
        YoutubeVideo? bestResult = null;
        int highestScore = 0;
        List<YoutubeVideo> videos = await Search(searchTerm);
        //videos = videos.Where(video => video.Id == "83xBPCw5hh4" || video.Id == "7-7NqHtpSdQ").ToList();
        artists = artists.Select(a => a.ToLower()).ToList();

        foreach (var video in videos)
        {
            int score = 0;

            bool isCorrectTitle = video.Title.Contains(track);
            bool isOfficial = officialFlag.IsMatch(video.Title);
            bool isValidTime = TimeSpan.TryParseExact(video.Duration, @"m\:ss", null, out TimeSpan videoDuration);

            foreach (string artist in artists)
            {
                bool isSameChannel = video.Author.ToLower().Contains(artist); //Is the artist the owner of the channel
                bool titleContainsArtist = video.Title.ToLower().Contains(artist); //Is the artist in the title

                score += isSameChannel ? 2 : 0; //Correct channel shhould take priority over correct title as search results will already contain a similar result to search term/trackname.
                score += titleContainsArtist ? 1 : 0;
            }

            score += isCorrectTitle ? 1 : 0;
            score += isOfficial ? 1 : 0;
            score += isCorrectTitle && isOfficial ? 2 : 0;

            if (isValidTime)
            {
                int durationDifference = Math.Abs((int)videoDuration.TotalMilliseconds - durationMs) / 1000;

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

        if (bestResult == null)
        {
            throw new ApiError(HttpStatusCode.NotFound, "Track not found");
        }

        bool success = int.TryParse(bestResult.Duration, out int duration);

        return new ExternalStreamResponse
        {
            Id = bestResult.Id,
            DurationMs = success ? duration : 0
        };

    }

    public async Task<string> GetStream(string id)
    {
        YoutubeClient youtube = new();
        StreamManifest streamManifest = await youtube.Videos.Streams.GetManifestAsync(id);

        return streamManifest
                        .GetAudioStreams()
                        .Where(s => s.Container == Container.Mp3 || s.Container == Container.Mp4)
                        .GetWithHighestBitrate().Url;
    }

    public static async Task<List<YoutubeVideo>> Search(string term)
    {
        using HttpClient httpClient = new();
        YoutubeSearchClient client = new(httpClient);

        YoutubeSearchResult responseObject = await client.SearchAsync(term);

        return responseObject.Results.ToList();
    }

    [GeneratedRegex("official\\s(video|audio|music\\svideo|lyric\\svideo|visualizer)", RegexOptions.IgnoreCase, "en-GB")]
    private static partial Regex VideoTitleRegex();
}
