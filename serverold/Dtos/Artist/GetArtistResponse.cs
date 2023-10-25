namespace melodiy.server.Dtos.Artist
{
    public class GetArtistResponse
    {
        public int Id { get; set; }
        public string UID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? CoverPath { get; set; }
        public bool Verified { get; set; }
    }
}