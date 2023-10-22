using System.ComponentModel.DataAnnotations.Schema;

namespace melodiy.server.Models
{
    [PrimaryKey(nameof(UID))]
    [Index(nameof(Id), IsUnique = true)]
    [Index(nameof(SpotifyId), IsUnique = true)]
    public class Song
    {
        public Song()
        {
            UID = Guid.NewGuid().ToString("N");
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string UID { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public string? Album { get; set; }
        public string? AlbumArtist { get; set; }
        public string? CoverPath { get; set; }
        public string? SongPath { get; set; } = string.Empty;
        public string? SpotifyId { get; set; }
        public string? YoutubeId { get; set; }
        public ProviderType Provider { get; set; }
        public int Duration { get; set; }
        public List<PlaylistSong> PlaylistSongs { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public DateTime ReleaseDate { get; set; }
        public Album? Album2 { get; set; }
        public int Position { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; }
    }
}