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

    /// <summary>
    /// Configures the EF Core model for this context and applies all entity type configurations found in the assembly containing <c>MelodiyDbContext</c>.
    /// </summary>
    /// <param name="modelBuilder">The <see cref="ModelBuilder"/> used to configure entity mappings and relationships.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Auto-discover entity configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MelodiyDbContext).Assembly);
    }

    /// <summary>
    /// Saves changes to the database after updating tracked entities' timestamp fields.
    /// </summary>
    /// <returns>The number of state entries written to the database.</returns>
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Saves pending changes to the database after updating CreatedAt and UpdatedAt timestamps on tracked entities.
    /// </summary>
    /// <returns>The number of state entries written to the database.</returns>
    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    /// <summary>
    /// Sets UTC timestamp properties on tracked BaseEntity instances before persistence.
    /// </summary>
    /// <remarks>
    /// For entities in the Added state, sets <c>CreatedAt</c> to the current UTC time; for entities in the Added or Modified state, sets <c>UpdatedAt</c> to the current UTC time.
    /// </remarks>
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
