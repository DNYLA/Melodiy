
using Melodiy.Application.Services.AlbumService;
using Melodiy.Application.Services.ArtistService;
using Melodiy.Domain.Entities;

namespace Melodiy.Application.Services.TrackService;

public class TrackPreview
{
    public int Id { get; set; }
    public string Slug { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public int Duration { get; set; }
    public List<ArtistPreview> Artists { get; set; } = new();
    public AlbumPreview? Album { get; set; }
    public Image? Image { get; set; }
}