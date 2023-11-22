using Melodiy.Application.Common.Interfaces.Services;

namespace Melodiy.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;

    public DateTime UnixTimeStampToUtc(long unixTimestamp)
    {
        if (unixTimestamp == 0) return UtcNow; //Return currentTime if unixTimestamp is 0

        DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(unixTimestamp);
        return dateTimeOffset.UtcDateTime;
    }
}