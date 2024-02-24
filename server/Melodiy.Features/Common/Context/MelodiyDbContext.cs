namespace Melodiy.Features.Common.Context;

using Melodiy.Features.Common.Context.Entities;
using Melodiy.Features.User.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class MelodiyDbContext(DbContextOptions<MelodiyDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

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
