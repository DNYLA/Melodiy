using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Models
{
    public class PlaylistSong
    {
        public int Id { get; set; }
        public string PlaylistUID { get; set; } = string.Empty;
        public string SongUID { get; set; } = string.Empty;
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt {get; set; }

        public Playlist Playlist { get; set; } = null!;
        public Song Song { get; set; } = null!;
        
    }
}