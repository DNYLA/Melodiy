namespace server.Providers
{
    public interface IAudioProvider
    {
        //Release is optional but in the future to refine searches it may help filter out false positives.
        Task<string> GetUrl(string track, List<string> artists, int durationMs);
        
    }
}