
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Common;
using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Infrastructure.Persistance;

public class DataContext : DbContext, IDataContext
{
    public DbSet<Album> Albums => Set<Album>();
    public DbSet<Artist> Artists => Set<Artist>();
    public DbSet<Image> Images => Set<Image>();
    public DbSet<Playlist> Playlists => Set<Playlist>();
    public DbSet<PlaylistTrack> PlaylistTracks => Set<PlaylistTrack>();
    public DbSet<Track> Tracks => Set<Track>();
    public DbSet<TrackArtist> TracksArtists => Set<TrackArtist>();
    public DbSet<User> Users => Set<User>();

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        #region Images
        modelBuilder.Entity<Album>()
                    .HasOne(a => a.Image)
                    .WithMany(i => i.Albums)
                    .HasForeignKey(a => a.ImageId)
                    .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Artist>()
                    .HasOne(a => a.Image)
                    .WithMany(i => i.Artists)
                    .HasForeignKey(a => a.ImageId)
                    .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Playlist>()
                    .HasOne(p => p.Image)
                    .WithMany(i => i.Playlists)
                    .HasForeignKey(p => p.ImageId)
                    .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Track>()
                    .HasOne(t => t.Image)
                    .WithMany(i => i.Tracks)
                    .HasForeignKey(t => t.ImageId)
                    .OnDelete(DeleteBehavior.SetNull);
        #endregion

        #region TrackArtist

        modelBuilder.Entity<Track>()
                    .HasMany(t => t.TrackArtists)
                    .WithOne(ta => ta.Track)
                    .HasForeignKey(ta => ta.TrackId)
                    .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Artist>()
                    .HasMany(a => a.TrackArtists)
                    .WithOne(ta => ta.Artist)
                    .HasForeignKey(ta => ta.ArtistId)
                    .OnDelete(DeleteBehavior.Cascade);

        #endregion

        #region PlaylistTracks
        modelBuilder.Entity<PlaylistTrack>()
                    .HasOne(ps => ps.Playlist)
                    .WithMany(p => p.PlaylistTracks)
                    .HasForeignKey(pt => pt.PlaylistId)
                    .OnDelete(DeleteBehavior.Cascade); // Allow cascading delete for PlaylistSongs in a playlist

        modelBuilder.Entity<PlaylistTrack>()
                    .HasOne(ps => ps.Track)
                    .WithMany(s => s.PlaylistTracks)
                    .HasForeignKey(pt => pt.TrackId)
                    .OnDelete(DeleteBehavior.Restrict); //Needs to be disabled for table to be valid.
        #endregion
    }

    public override int SaveChanges()
    {
        UpdateTimeStamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimeStamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimeStamps()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseEntity && (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;

            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.UtcNow;
            }
        }
    }
}