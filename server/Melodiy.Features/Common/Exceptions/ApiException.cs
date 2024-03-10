﻿using System.Net;

namespace Melodiy.Features.Common.Exceptions;

public sealed class ApiException : Exception
{
    public int StatusCode { get; set; }

    public ApiException(int statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public ApiException(int statusCode)
    {
        StatusCode = statusCode;
    }

    public ApiException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = (int)statusCode;
    }

    public ApiException(HttpStatusCode statusCode)
    {
        StatusCode = (int)statusCode;
    }
}