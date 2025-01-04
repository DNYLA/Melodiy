namespace Melodiy.Features.User.Models;

using Microsoft.AspNetCore.Http;

//More stuff will be added in the future easier to create the Form request now instead of only requesting an image
public sealed class UpdateUserRequest
{
    public IFormFile? Image { get; set; }

    public bool UpdateImage { get; set; }
}