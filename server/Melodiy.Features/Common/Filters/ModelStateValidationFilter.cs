namespace Melodiy.Features.Common.Filters;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ModelStateValidationFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            context.Result = new UnprocessableEntityObjectResult(
                new ValidationProblemDetails(context.ModelState));
        }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}