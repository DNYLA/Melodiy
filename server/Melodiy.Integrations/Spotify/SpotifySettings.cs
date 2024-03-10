namespace Melodiy.Integrations.Spotify;

public class SpotifySettings
{
    public const string SectionName = "Spotify";

    public string ClientId { get; init; } = null!;

    public string ClientSecret { get; init; } = null!;
}