using Melodiy.Features.Common.Exceptions;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;

namespace Melodiy.Features.Common;

/// <summary>
/// Base controller providing common functionality for all API controllers.
/// </summary>
[ApiController]
public abstract class BaseController : ControllerBase
{
    private const string DefaultNotFoundMessage = "The requested resource was not found.";
    private const string DefaultBadRequestMessage = "The request was invalid.";

    /// <summary>
    /// Gets the current authenticated user's ID from the JWT token claims.
    /// </summary>
    /// <summary>
    /// Retrieves the authenticated user's ID from the JWT NameIdentifier claim.
    /// </summary>
    /// <returns>The authenticated user's ID.</returns>
    /// <exception cref="ApiException">Thrown with HTTP 401 Unauthorized when the user ID claim is missing or empty.</exception>
    protected int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
        {
            throw new ApiException(HttpStatusCode.Unauthorized, "User is not authenticated");
        }

        //TODO: Fetch user from DB Cache and return cached data.

        return int.Parse(userIdClaim);
    }

    /// <summary>
    /// Gets the current authenticated user's ID from the JWT token claims.
    /// </summary>
    /// <summary>
    /// Retrieves the current authenticated user's ID, or null if the ID cannot be determined.
    /// </summary>
    /// <returns>The user's ID when authenticated; otherwise null.</returns>
    protected int? GetCurrentUserIdOrNull()
    {
        try
        {
            return GetCurrentUserId();
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Creates a standardized NotFound response.
    /// </summary>
    /// <summary>
/// Signal a 404 Not Found API error using the provided message or the default message.
/// </summary>
/// <param name="message">Optional error message; if null, the default not-found message is used.</param>
/// <returns>An <see cref="ActionResult"/> that represents a 404 Not Found error.</returns>
/// <exception cref="ApiException">Thrown with HTTP status 404 and the provided or default message.</exception>
    protected static ActionResult NotFound(string? message = null) => throw new ApiException(HttpStatusCode.NotFound, message ?? DefaultNotFoundMessage);

    /// <summary>
    /// Creates a standardized BadRequest response.
    /// </summary>
    /// <summary>
/// Produces a standardized 400 Bad Request response by throwing an <see cref="ApiException"/> with the provided message.
/// </summary>
/// <param name="message">The error message to include in the response; if null, the default bad request message is used.</param>
/// <returns>An <see cref="ActionResult"/> representing a 400 Bad Request (this method always throws).</returns>
/// <exception cref="ApiException">Thrown with HTTP status 400 and the provided or default message.</exception>
    protected static ActionResult BadRequest(string? message = null) => throw new ApiException(HttpStatusCode.BadRequest, message ?? DefaultBadRequestMessage);
}
