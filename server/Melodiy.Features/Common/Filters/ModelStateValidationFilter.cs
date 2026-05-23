namespace Melodiy.Features.Common.Filters;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ModelStateValidationFilter : IActionFilter
{
    /// <summary>
    /// Validates the current action's ModelState and, if invalid, short-circuits the request by setting the action result to an Unprocessable Entity containing validation problem details.
    /// </summary>
    /// <param name="context">The ActionExecutingContext for the executing action; its Result will be set when the ModelState is invalid.</param>
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            context.Result = new UnprocessableEntityObjectResult(
                new ValidationProblemDetails(context.ModelState));
        }
    }

    /// <summary>
/// No post-action processing; method intentionally performs no work.
/// </summary>
/// <param name="context">The context for the executed action.</param>
public void OnActionExecuted(ActionExecutedContext context) { }
}