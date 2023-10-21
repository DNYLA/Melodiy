using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
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
        public string? Description {get; set; }
        public string? CoverPath { get; set; }
        public Boolean Verified {get; set; } = false;
        public string? SpotifyId { get; set; }
        public DateTime ReleaseDate { get; set; } //TODO: Remove and create migration
        public List<Album> Releases { get; set;}

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; }
    }
}