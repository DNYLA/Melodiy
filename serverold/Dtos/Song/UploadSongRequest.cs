using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace melodiy.server.Dtos.Song
{
    public class UploadSongRequest
    {
        public IFormFile Audio { get; set; } = null!;
        public IFormFile? Image { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public string? Album { get; set; }
        public string? AlbumArtist { get; set; }
    }
}