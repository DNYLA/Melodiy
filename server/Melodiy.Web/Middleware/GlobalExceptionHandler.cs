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
    /// <summary>
    /// Handles an exception by logging it and attempting to write an RFC 7807 ProblemDetails response into the provided HTTP context.
    /// </summary>
    /// <param name="httpContext">The current HTTP context to which the ProblemDetails response will be written.</param>
    /// <param name="exception">The exception to classify and include in the ProblemDetails response.</param>
    /// <param name="cancellationToken">A token to observe while performing the write operation.</param>
    /// <returns>`true` if a ProblemDetails response was written to the response, `false` otherwise.</returns>
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

    /// <summary>
    /// Maps an exception to an appropriate HTTP status code and a human-readable problem title.
    /// </summary>
    /// <param name="exception">The exception to classify for an HTTP response.</param>
    /// <returns>A tuple `(StatusCode, Title)` where `StatusCode` is the HTTP status code to use and `Title` is the short description for the problem details.</returns>
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