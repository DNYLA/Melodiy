using Melodiy.Domain.Enums;

namespace Melodiy.Application.Common.Entities;

public class ExternalTrack
{
    public string Id { get; set; } = null!;
    public string ArtistId { get; set; } = null!;
    public string AlbumId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
}