namespace Melodiy.Features.Profile;

using System.Net;

using Melodiy.Features.Common.Exceptions;
using Melodiy.Features.Profile.Models;
using Melodiy.Features.User;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProfileController(IProfileService profileService, IUserService userService) : ControllerBase
{
    [HttpGet("{username}")]
    public async Task<ProfileViewModel> GetProfile(string username)
    {
        var user = await userService.GetUserDetails();
        var includePrivate = user?.Username.Equals(username, StringComparison.CurrentCultureIgnoreCase) ?? false;

        var profile = await profileService.GetProfile(username, includePrivate);

        return profile ?? throw new ApiException(HttpStatusCode.NotFound, $"Could not find a profile named {username}");
    }
}