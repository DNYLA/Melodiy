namespace Melodiy.Integrations.Supabasee;

public sealed class SupabaseSettings
{
    public const string SectionName = "Supabase";

    public string ServiceRole { get; init; } = null!;

    public string Url { get; init; } = null!;
}