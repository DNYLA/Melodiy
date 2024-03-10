namespace Melodiy.Features.Common.Services;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }

    DateTime UnixTimeStampToUtc(long unixTimestamp);
}
