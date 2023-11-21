using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Melodiy.Api.Models;
using Melodiy.Application.Common.Errors;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Melodiy.Api.Bindings;

public class ClaimsModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null)
        {
            throw new ArgumentNullException(nameof(bindingContext));
        }

        var user = bindingContext.HttpContext.User;

        if (user?.Identity?.IsAuthenticated == true)
        {
            var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)!.Value!;
            var username = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)!.Value!;

            var claims = new UserClaims()
            {
                Id = int.Parse(userId),
                Username = username,
            };

            bindingContext.Result = ModelBindingResult.Success(claims);
        }
        else
        {
            bindingContext.Result = ModelBindingResult.Failed();
        }

        return Task.CompletedTask;
    }
}