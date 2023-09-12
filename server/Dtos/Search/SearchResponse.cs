using melodiy.server.Dtos.Song;

namespace melodiy.server.Dtos.Search
{
    //Future updates will allow for searching to return playlists, artists and songs at once so this is created to prepare for the update.
    public class SearchResults
    {
        public List<GetSongResponse> Songs { get; set; } = new List<GetSongResponse>();
    }
}