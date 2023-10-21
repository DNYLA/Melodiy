using System.ComponentModel.DataAnnotations.Schema;

namespace melodiy.server.Models
{

    [PrimaryKey(nameof(UID))]
    [Index(nameof(Id), IsUnique = true)]
    [Index(nameof(SpotifyId), IsUnique = true)]
    public class Artist
    {
        public Artist()
        {
            UID = Guid.NewGuid().ToString("N");
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string UID { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverPath { get; set; }
        public bool Verified { get; set; }
        public string? SpotifyId { get; set; }
        public List<Album> Releases { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; }
    }
}