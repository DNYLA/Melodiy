using System.Runtime.CompilerServices;

namespace Melodiy.Features.Common.Extensions;

public static class TimeProviderExtensions
{
    /// <summary>
    /// Gets the current UTC time as a DateTimeOffset with an offset of +00:00.
    /// </summary>
    /// <returns>A DateTimeOffset representing the current UTC time with an offset of +00:00.</returns>
    extension(TimeProvider timeProvider)
    {
        /// <summary>
        /// Returns the current UTC time with an offset of +00:00
        /// </summary>
        /// <returns></returns>
        public DateTimeOffset UtcNow()
        {
            return timeProvider.GetUtcNow().ToUniversalTime();
        }
    }
}
