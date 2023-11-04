using Melodiy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Application.Common.Interfaces.Persistance;

public interface IDataContext
{
    DbSet<Album> Albums { get; }
    DbSet<Artist> Artists { get; }
    DbSet<Image> Images { get;  }
    DbSet<Playlist> Playlists { get; }
    DbSet<PlaylistTrack> PlaylistTracks { get; }
    DbSet<Track> Tracks { get; }
    DbSet<TrackArtist> TracksArtists { get; }
    DbSet<User> Users { get; }

    // Add any additional DbSets or methods you need to expose
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}