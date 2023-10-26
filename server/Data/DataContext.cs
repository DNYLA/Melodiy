using Melodiy.Models;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Data;

public class DataContext : DbContext
{
    public DbSet<User> Users => Set<User>();

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public override int SaveChanges()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseEntity && (
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.Now;

            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.Now;
            }
        }

        return base.SaveChanges();
    }

}

