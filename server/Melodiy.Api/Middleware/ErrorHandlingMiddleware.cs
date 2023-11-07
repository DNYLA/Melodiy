using System.Net;
using System.Text.Json;
using Melodiy.Application.Common.Errors;

namespace Melodiy.Api.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ApiError ex)
        {
            Console.WriteLine(ex.Message);
            await HandleExceptionAsync(context, ex);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            // _logger.LogError("Something went wrong: {ex}", ex);
            await HandleExceptionAsync(context,
                new ApiError(HttpStatusCode.InternalServerError, "An error occured while processing your request"));
        }
    }

    private Task HandleExceptionAsync(HttpContext context, ApiError ex)
    {
        // var code = HttpStatusCode.InternalServerError;
        //TODO: Add Logging

        var result = JsonSerializer.Serialize(new { error = ex.Message });

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = ex.StatusCode;

        return context.Response.WriteAsync(result);
    }

}