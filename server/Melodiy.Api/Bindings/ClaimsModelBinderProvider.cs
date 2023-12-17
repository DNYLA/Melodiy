using Melodiy.Application.Common;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace Melodiy.Api.Bindings;

public class ClaimsModelBinderProvider : IModelBinderProvider
{
    public IModelBinder GetBinder(ModelBinderProviderContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        if (context.Metadata.ModelType == typeof(UserClaims))
        {
            return new BinderTypeModelBinder(typeof(ClaimsModelBinder));
        }

        return null;
    }
}