using System.Net;

namespace Melodiy.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    // private readonly ILogger _logger;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
        // _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (APIException ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
        catch (Exception ex)
        {
            // _logger.LogError("Something went wrong: {ex}", ex);
            await HandleExceptionAsync(httpContext, new APIException(HttpStatusCode.InternalServerError, ex.Message));
        }
    }

    private Task HandleExceptionAsync(HttpContext context, APIException ex)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = ex.StatusCode;

        return context.Response.WriteAsync(ex.ToString());
    }
}