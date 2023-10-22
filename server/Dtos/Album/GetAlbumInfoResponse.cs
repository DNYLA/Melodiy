using melodiy.server.Dtos.Artist;

namespace melodiy.server.Dtos.Album
{
    public class GetAlbumInfoResponse
    {
        public int Id { get; set; }
        public string UID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverPath { get; set; }
        public bool Verified { get; set; }
        public DateTime ReleaseDate { get; set; }
        public AlbumType Type { get; set; }
        public int TotalTracks { get; set; }
        public int Duration { get; set; }
        public List<GetArtistResponse> Artists { get; set; } = new();
    }
}