using Melodiy.Features.Common.Exceptions;

using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

using System.Net;

namespace Melodiy.Web.Middleware;

public class GlobalExceptionHandler(
    IHostEnvironment env,
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var exceptionDetails = GetExceptionDetails(exception);
        logger.LogWarning(exception, "Exception {StatusCode}: {Message}", exceptionDetails.StatusCode, exceptionDetails.Title);

        var problemDetails = new ProblemDetails
        {
            Title = exceptionDetails.Title,
            Detail = env.IsDevelopment() ? exception.Message : null, // Only log out non api exception messages in development (api exception messages are logged in the title)
            Status = exceptionDetails.StatusCode
        };

        return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = problemDetails
        });
    }

    private static (int StatusCode, string Title) GetExceptionDetails(Exception exception)
    {
        return exception switch
        {
            ApiException apiException => (apiException.StatusCode, apiException.Message),
            ArgumentNullException => ((int)HttpStatusCode.BadRequest, "Invalid argument provided"),
            ArgumentException => ((int)HttpStatusCode.BadRequest, "Invalid argument provided"),
            UnauthorizedAccessException => ((int)HttpStatusCode.Unauthorized, "Unauthorized"),
            _ => ((int)HttpStatusCode.InternalServerError, "An error occured while processing your request")
        };
    }
}