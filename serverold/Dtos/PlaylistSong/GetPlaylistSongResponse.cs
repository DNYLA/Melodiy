using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.PlaylistSong
{
    public class GetPlaylistSongResponse
    {
        public string PlaylistId { get; set; } = string.Empty;
        public string TrackId { get; set; } = string.Empty;
        public DateTime CreatedAt {get; set; }
    }
}