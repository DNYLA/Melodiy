namespace Melodiy.Features.Authentication.Jwt;

public class AuthenticationSettings
{
    public const string SectionName = "Authentication";

    public string Secret { get; init; } = null!;

    public int ExpiryMinutesJwt { get; init; }

    public int ExpiryDaysRefresh { get; init; }

    public string Issuer { get; init; } = null!;

    public string Audience { get; init; } = null!;
}
