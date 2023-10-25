using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using melodiy.server.Dtos.PlaylistSong;
using melodiy.server.Dtos.Song;

namespace melodiy.server.Dtos.Playlist
{
    public class GetPlaylistResponse
    {
		public string UID { get; set; } = string.Empty;
        public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string ImagePath { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<GetSongResponse> Tracks { get; set; } = new List<GetSongResponse>();
		public GetUserResponse User { get; set; } = null!;
    }
}