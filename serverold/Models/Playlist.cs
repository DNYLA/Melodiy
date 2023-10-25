using System.ComponentModel.DataAnnotations.Schema;

namespace melodiy.server.Models
{
    [PrimaryKey(nameof(UID))]
    [Index(nameof(Id), IsUnique = true)]
    public class Playlist
    {
		public Playlist()
		{
			UID = Guid.NewGuid().ToString("N");
		}
		
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string UID { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public string Title { get; set; } = string.Empty;
		public string? ImagePath { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt {get; set; }

        public List<PlaylistSong> PlaylistSongs { get; set; }
		public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}