using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.Playlist
{
    public class GetTrendingPlaylistResponse
    {
        public string UID { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public GetUserResponse User { get; set; } = null!;
    }
}