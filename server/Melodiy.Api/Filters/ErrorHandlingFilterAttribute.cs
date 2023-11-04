using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Melodiy.Api.Filters;

public class ErrorHandlingFilter : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        var exception = context.Exception;

        var problemDetails = new ProblemDetails
        {
            Type = "url",
            Title = "An error occured while processing your request.",
            Status = (int)HttpStatusCode.InternalServerError,
        };

        context.Result = new ObjectResult(problemDetails);

        context.ExceptionHandled = true;
    }
}