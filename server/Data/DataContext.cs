namespace melodiy.server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Clusters & Indexes
            //Songs
            modelBuilder.Entity<Song>()
                .HasKey(s => s.UID)
                .IsClustered(false);

            modelBuilder.Entity<Song>()
                .HasIndex(s => s.Id)
                .IsClustered();

            //Playlists
            modelBuilder.Entity<Playlist>()
                .HasKey(s => s.UID)
                .IsClustered(false);

            modelBuilder.Entity<Playlist>()
                .HasIndex(s => s.Id)
                .IsClustered();
            #endregion
            
            #region Timestamps
            //CreatedAt TimeStamps
            modelBuilder.Entity<Song>()
                .Property(s => s.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            modelBuilder.Entity<Playlist>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            modelBuilder.Entity<PlaylistSong>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            #endregion
            
            #region Disable Cascading Deletes
            modelBuilder.Entity<PlaylistSong>()
                .HasKey(ps => new { ps.Id });

            modelBuilder.Entity<PlaylistSong>()
                .HasOne(ps => ps.Playlist)
                .WithMany(p => p.PlaylistSongs)
                .HasForeignKey(ps => ps.PlaylistUID)
                .OnDelete(DeleteBehavior.Cascade); // Allow cascading delete for PlaylistSongs in a playlist

            modelBuilder.Entity<PlaylistSong>()
                .HasOne(ps => ps.Song)
                .WithMany(s => s.PlaylistSongs)
                .HasForeignKey(ps => ps.SongUID)
                .OnDelete(DeleteBehavior.Restrict); //Needs to be disabled for table to be valid.
            #endregion
        }

		public DbSet<User> Users => Set<User>();
		public DbSet<Playlist> Playlists => Set<Playlist>();
		public DbSet<Song> Songs => Set<Song>();
		public DbSet<PlaylistSong> PlaylistSongs => Set<PlaylistSong>();
    }
}