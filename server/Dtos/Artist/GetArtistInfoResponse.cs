using melodiy.server.Dtos.Song;
using server.Models;

namespace melodiy.server.Dtos.Artist
{
    public class GetArtistInfoResponse
    {
        public int Id { get; set; }
        public string UID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverPath { get; set; }
        public Boolean Verified { get; set; }
        public int MonthlyListeners { get; set; }
        public List<Album> Albums { get; set; } = new();
        public List<Album> Singles { get; set; } = new();
        public List<GetSongResponse> TopTracks { get; set; } = new();
        public DateTime CreatedAt { get; set; }
    }
}