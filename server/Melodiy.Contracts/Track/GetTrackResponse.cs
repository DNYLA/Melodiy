namespace Melodiy.Contracts.Track;

public class GetTrackResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string? Album { get; set; }
    public string? AlbumArtist { get; set; }
    public string? Image { get; set; } = string.Empty;
    // public string SongPath { get; set; } = string.Empty;
    // public ProviderType Provider { get; set; }
    // public int Duration { get; set; }
    // public DateTime ReleaseDate { get; set; }
    // public DateTime CreatedAt { get; set; }
    // public GetUserResponse User { get; set; } = null!;
}