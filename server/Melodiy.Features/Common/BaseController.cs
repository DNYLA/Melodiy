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
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    private const string DefaultNotFoundMessage = "The requested resource was not found.";
    private const string DefaultBadRequestMessage = "The request was invalid.";

    /// <summary>
    /// Gets the current authenticated user's ID from the JWT token claims.
    /// </summary>
    /// <returns>User ID if authenticated, null otherwise.</returns>
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
    /// <returns>User ID if authenticated, null otherwise.</returns>
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
    /// <param name="message">The error message.</param>
    protected static ActionResult NotFound(string? message = null) => throw new ApiException(HttpStatusCode.NotFound, message ?? DefaultNotFoundMessage);

    /// <summary>
    /// Creates a standardized BadRequest response.
    /// </summary>
    /// <param name="message">The error message.</param>
    protected static ActionResult BadRequest(string? message = null) => throw new ApiException(HttpStatusCode.BadRequest, message ?? DefaultBadRequestMessage);
}
