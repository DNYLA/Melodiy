namespace Melodiy.Features.Common.Services;

public sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;

    public DateTime UnixTimeStampToUtc(long unixTimestamp)
    {
        return unixTimestamp == 0 ? UtcNow : 
                   DateTimeOffset.FromUnixTimeSeconds(unixTimestamp).UtcDateTime;
    }
}
