namespace Melodiy.Infrastructure.Persistance.File;

public class SupabaseSettings
{
    public const string SectionName = "Supabase";
    public string PrivateKey { get; init; } = null!;
    public string Url { get; init; } = null!;
}