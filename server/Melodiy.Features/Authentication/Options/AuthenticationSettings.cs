namespace Melodiy.Features.Authentication.Options;

public sealed record AuthenticationSettings
{
    public const string SectionName = "Authentication";

    public const string Issuer = "Melodiy";

    public const string Audience = "Melodiy";

    public const double ExpiryMinutesJwt = 15;

    public const double ExpiryDaysRefresh = 7;

    public required string Secret { get; init; }
}