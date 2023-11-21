using Melodiy.Application.Common.Interfaces.Services;

namespace Melodiy.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;

    public DateTime UnixTimeStampToUtc(long unixTimestamp)
    {
        DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(unixTimestamp);
        return dateTimeOffset.UtcDateTime;
    }
}