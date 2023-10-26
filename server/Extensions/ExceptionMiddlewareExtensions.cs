using Melodiy.Middleware;
using Npgsql.Replication;

namespace Melodiy.Extensions;

public static class ExceptionMiddlewareExtensions
{
    public static void ConfingureCustomExceptionMiddleWare(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
    }
}