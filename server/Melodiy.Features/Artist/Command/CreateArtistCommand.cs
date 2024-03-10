namespace Melodiy.Features.Artist.Command;

using MediatR;

using Melodiy.Features.Artist.Models;

using Microsoft.AspNetCore.Http;

public sealed class CreateArtistCommand : IRequest<ArtistResponse>
{
    public string Name { get; set; }

    public int UserId { get; set; }

    public IFormFile? Image { get; set; }
}