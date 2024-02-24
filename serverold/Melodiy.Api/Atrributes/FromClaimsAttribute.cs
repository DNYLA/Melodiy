using Melodiy.Api.Bindings;
using Microsoft.AspNetCore.Mvc;

namespace Melodiy.Api.Attributes;

public class FromClaimsAttribute : ModelBinderAttribute
{
    public FromClaimsAttribute() : base(typeof(ClaimsModelBinder))
    {
    }
}