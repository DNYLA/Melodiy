using System.Runtime.CompilerServices;

namespace Melodiy.Features.Common.Extensions;

public static class TimeProviderExtensions
{
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
