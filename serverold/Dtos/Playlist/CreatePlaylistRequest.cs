using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.Playlist
{
    public class CreatePlaylistRequest
    {
        public string Title { get; set; } = string.Empty;
    }
}