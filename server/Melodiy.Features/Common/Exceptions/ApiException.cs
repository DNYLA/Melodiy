namespace Melodiy.Features.Common.Exceptions;

using System;
using System.Net;

public sealed class ApiException : Exception
{
    public int StatusCode { get; set; }

    public ApiException(int statusCode, string? message = null) : base(message)
    {
        StatusCode = statusCode;
    }

    public ApiException(HttpStatusCode statusCode, string? message = null) : base(message)
    {
        StatusCode = (int)statusCode;
    }
}