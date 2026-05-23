namespace Melodiy.Features.Common.Data;

using Melodiy.Features.Authentication.Entities;
using Melodiy.Features.Common.Data.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

public class MelodiyDbContext(DbContextOptions<MelodiyDbContext> options) : DbContext(options)
{
    public DbSet<UserEntity> Users { get; set; }

    public DbSet<AuthenticationDetails> AuthenticationDetails { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Auto-discover entity configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MelodiyDbContext).Assembly);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
                                   .Where(e => e is { Entity: BaseEntity, State: EntityState.Added or EntityState.Modified });

        foreach (var entry in entries)
        {
            var entity = (BaseEntity)entry.Entity;

            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTimeOffset.UtcNow;
            }

            entity.UpdatedAt = DateTimeOffset.UtcNow;
        }
    }
}
