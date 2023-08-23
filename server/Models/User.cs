namespace melodiy.server.Models
{
    public class User
    {
        public int Id { get; set; }
		public string Username { get; set; } = string.Empty;
		public byte[] Password { get; set; } = new byte[0];
		public byte[] Salt { get; set; } = new byte[0];
		public List<Playlist> Playlists { get; set; } = new List<Playlist>();
		public List<Song> Songs { get; set; } = new List<Song>();
    }
}