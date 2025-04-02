namespace Melodiy.Features.Track.Command;

using MediatR;

using Melodiy.Features.Track.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreateTrackCommand : IRequest<TrackResponse>
{
    public IFormFile Audio { get; set; } = null!;

    public IFormFile? Image { get; set; }

    public string Title { get; set; }

    public bool Explicit { get; set; }

    public bool Public { get; set; }

    public bool Encrypted { get; set; }

    public string ArtistId { get; set; }

    public string? AlbumId { get; set; }

    public int UserId { get; set; }
}