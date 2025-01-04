namespace Melodiy.Features.Profile;

using Melodiy.Features.Profile.Models;

public interface IProfileService
{
    Task<ProfileViewModel?> GetProfile(string username, bool includePrivate);
}