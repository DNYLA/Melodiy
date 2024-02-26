namespace Melodiy.Web.Common.Middleware;

using Melodiy.Features.Common.Exceptions;

using Microsoft.AspNetCore.Http;

using System.Net;
using System.Text.Json;

internal class ErrorHandlingMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ApiException ex)
        {
            //TODO: Add Logging
            await HandleExceptionAsync(context, ex);
        }
        catch (Exception ex)
        {
            //TODO: Add Logging for unknown errors Log ex.Message
            await HandleExceptionAsync(
                context,
                new ApiException(HttpStatusCode.InternalServerError, "An error occured while processing your request"));
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, ApiException ex)
    {
        var result = JsonSerializer.Serialize(new { error = ex.Message });

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = ex.StatusCode;

        return context.Response.WriteAsync(result);
    }
}