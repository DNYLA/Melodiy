namespace Melodiy.Integrations.Common.Stream;

public sealed class ExternalStreamResponse
{
    public string Id { get; set; }

    public int DurationMs { get; set; }

    public SourceType Source { get; set; }
}