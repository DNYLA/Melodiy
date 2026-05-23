namespace Melodiy.Features.Common.Exceptions;

using System;
using System.Net;

public sealed class ApiException : Exception
{
    public int StatusCode { get; set; }

    /// <summary>
    /// Initializes a new <see cref="ApiException"/> with the specified HTTP status code and optional message.
    /// </summary>
    /// <param name="statusCode">The HTTP status code representing the error.</param>
    /// <param name="message">An optional error message providing additional details.</param>
    public ApiException(int statusCode, string? message = null) : base(message)
    {
        StatusCode = statusCode;
    }

    /// <summary>
    /// Initializes a new <see cref="ApiException"/> with the specified HTTP status code and optional message.
    /// </summary>
    /// <param name="statusCode">The HTTP status code to associate with the exception.</param>
    /// <param name="message">An optional message that describes the error.</param>
    public ApiException(HttpStatusCode statusCode, string? message = null) : base(message)
    {
        StatusCode = (int)statusCode;
    }
}