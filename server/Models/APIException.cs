using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Melodiy.Models;

public class APIException : Exception
{
    public int StatusCode { get; set; }

    public APIException(int statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public APIException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = (int)statusCode;
    }

    public override string ToString()
    {
        return JsonSerializer.Serialize(new { StatusCode, base.Message });
    }
}