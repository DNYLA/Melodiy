namespace Melodiy.Integrations.Common.Stream;

public interface IStreamProvider
{
    Task<ExternalStreamResponse> GetBestMatch(string title, List<string> artists, int durationMs);

    Task<string> GetStream(string id);
}