namespace Melodiy.Application.Common.Interfaces.Services;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
    DateTime UnixTimeStampToUtc(long unixTimestamp);
}