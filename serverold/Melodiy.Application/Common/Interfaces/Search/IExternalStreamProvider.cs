using Melodiy.Application.Common.Entities;

namespace Melodiy.Application.Common.Interfaces.Search;

public interface IExternalStreamProvider
{
    Task<ExternalStreamResponse> GetBestMatch(string track, List<string> artists, int durationMs);
    Task<string> GetStream(string id);
}
