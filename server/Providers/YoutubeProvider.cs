using System.Text.RegularExpressions;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;
using YoutubeSearchApi.Net.Models.Youtube;
using YoutubeSearchApi.Net.Services;
namespace melodiy.server.Providers
{
    public partial class YoutubeProvider : IAudioProvider
    {
        private readonly Regex officialFlag = MyRegex();

        public static async Task<List<YoutubeVideo>> Search(string term)
        {
            using HttpClient httpClient = new();
            YoutubeSearchClient client = new(httpClient);

            YoutubeSearchResult responseObject = await client.SearchAsync(term);

            return responseObject.Results.ToList();
        }
        public async Task<YoutubeVideo> Find(string track, List<string> artists, int durationMs)
        {
            string searchTerm = $"{track} - {string.Join(',', artists)}";
            YoutubeVideo? bestResult = null;
            int highestScore = 0;
            Console.WriteLine($"YT Provider: {searchTerm}");
            try
            {
                List<YoutubeVideo> videos = await Search(searchTerm);

                //This algorithm is a modified version of Spotitube algorithm 
                //https://github.com/KRTirtho/spotube/blob/master/lib/models/spotube_track.dart#L81
                foreach (YoutubeVideo video in videos)
                {
                    int score = 0;

                    #region Calculating Score
                    //If any of the artists are in the title or channel name it will increase the score
                    foreach (string artist in artists)
                    {
                        bool isSameChannel = video.Author.ToLower().Contains(artist); //Is the artist the owner of the channel
                        bool titleContainsArtist = video.Title.ToLower().Contains(artist); //Is the artist in the title

                        if (isSameChannel)
                        {
                            score += 1;
                        }

                        if (titleContainsArtist)
                        {
                            score += 1;
                        }
                    }

                    bool isCorrectTitle = video.Title.Contains(track);
                    bool isOfficial = officialFlag.IsMatch(video.Title);
                    bool isValidTime = TimeSpan.TryParseExact(video.Duration, @"m\:ss", null, out TimeSpan videoDuration);

                    //This means any result can be within 10 seconds above or below the actual.
                    int durationDifference = 0;

                    if (isValidTime)
                    {
                        durationDifference = Math.Abs((int)videoDuration.TotalMilliseconds - durationMs) / 1000;
                    }

                    if (isCorrectTitle)
                    {
                        score += 2;
                    }

                    if (isOfficial)
                    {
                        score += 1;
                    }

                    if (isCorrectTitle && isOfficial)
                    {
                        score += 2;
                    }

                    if (durationDifference <= 5)
                    {
                        score += 3;
                    }
                    else if (durationDifference <= 15)
                    {
                        score += 1;
                    }
                    #endregion

                    if (score > highestScore)
                    {
                        bestResult = video;
                        highestScore = score;
                    }
                }

                return bestResult ?? throw new Exception("Track not found");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Track not found");
            }
        }

        public async Task<string> GetStream(string id)
        {
            var youtube = new YoutubeClient();
            StreamManifest streamManifest = await youtube.Videos.Streams.GetManifestAsync(id);
            string streamInfo = streamManifest
                            .GetAudioStreams()
                            .Where(s => s.Container == Container.Mp3 || s.Container == Container.Mp4)
                            .GetWithHighestBitrate().Url;

            return streamInfo;
        }

        [GeneratedRegex("official\\s(video|audio|music\\svideo|lyric\\svideo|visualizer)", RegexOptions.IgnoreCase, "en-GB")]
        private static partial Regex MyRegex();
    }
}