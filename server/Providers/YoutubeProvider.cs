using System.Text.RegularExpressions;
using YoutubeExplode;
using YoutubeExplode.Common;
using YoutubeExplode.Search;
using YoutubeExplode.Videos.Streams;

namespace server.Providers
{
    public class YoutubeProvider : IAudioProvider
    {

        Regex officialFlag = new Regex(@"official\s(video|audio|music\svideo|lyric\svideo|visualizer)",
          RegexOptions.IgnoreCase);

        [Obsolete]
        public async Task<string> GetUrl(string track, List<string> artists, int durationMs)
        {
            var youtube = new YoutubeClient();
            var searchTerm = $"{track} - {String.Join(',', artists)}";
            VideoSearchResult? bestResult = null;
            int highestScore = 0;
            Console.WriteLine(searchTerm);
            try 
            {
                var videos =  await youtube.Search.GetVideosAsync(searchTerm);

                //This algorithm is a modified version of Spotitube algorithm 
                //https://github.com/KRTirtho/spotube/blob/master/lib/models/spotube_track.dart#L81
                foreach (VideoSearchResult video in videos)
                {
                    int score = 0;

                    //If any of the artists are in the title or channel name it will increase the score
                    foreach (string artist in artists)
                    {
                        bool isSameChannel = video.Author.Title.ToLower().Contains(artist);
                        bool titleContainsArtist = video.Title.ToLower().Contains(artist);
                        
                        if (isSameChannel) score += 1;
                        if (titleContainsArtist) score += 1;
                    }

                    bool isCorrectTitle = video.Title.Contains(track);
                    bool isOfficial = officialFlag.IsMatch(video.Title);

                    int videoDurationMs = video.Duration.HasValue ? 
                                                Convert.ToInt32(video.Duration.Value.TotalMilliseconds) :
                                                int.MaxValue;
                    
                    //This means any result can be within 10 seconds above or below the actual.
                    int durationDifference = Math.Abs(videoDurationMs - durationMs) / 1000;
                    if (isCorrectTitle) score += 2;
                    if (isOfficial) score += 1;

                    if (isCorrectTitle && isOfficial) score += 2;
                    
                    if (durationDifference <= 5) score += 3;
                    else if (durationDifference <= 15) score += 1;
                    
                    if (score > highestScore)
                    {
                        bestResult = video;
                        highestScore = score;
                    }
                }
                Console.WriteLine(videos[0]);

                if (bestResult == null) throw new Exception("Track not found");
                StreamManifest streamManifest = await youtube.Videos.Streams.GetManifestAsync(bestResult.Id);
                string streamInfo = streamManifest
                                .GetAudioStreams()
                                .Where(s => s.Container == Container.Mp3 || s.Container == Container.Mp4)
                                .GetWithHighestBitrate().Url;

                return streamInfo;
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return string.Empty;
            }

        }
    }
}