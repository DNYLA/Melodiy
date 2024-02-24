using System.Net;
using System.Text.Json;

namespace Melodiy.Application.Common.Errors;

public class ApiError : Exception
{
    public int StatusCode { get; set; }

    public ApiError(int statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public ApiError(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = (int)statusCode;
    }

    // public override string ToString()
    // {
    //     return JsonSerializer.Serialize(new { StatusCode, base.Message });
    // }
}