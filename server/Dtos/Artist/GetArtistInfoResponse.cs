using melodiy.server.Dtos.Song;

namespace melodiy.server.Dtos.Artist
{
    public class GetArtistInfoResponse : GetArtistResponse
    {
        public string? Description { get; set; }
        public int MonthlyListeners { get; set; }
        public List<Album> Albums { get; set; } = new();
        public List<Album> Singles { get; set; } = new();
        public List<GetSongResponse> TopTracks { get; set; } = new();
        public DateTime CreatedAt { get; set; }
    }
}